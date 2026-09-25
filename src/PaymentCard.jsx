import { useMemo, useState } from "react";
import {
  createPublicClient,
  createWalletClient,
  custom,
  encodeFunctionData,
  formatUnits,
  http,
  parseUnits,
} from "viem";
import { bsc } from "viem/chains";
import {
  CHAIN_ID,
  getPayeeAddress,
  USDT_ABI,
  USDT_ADDRESS,
} from "./config.js";

function shorten(address) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export default function PaymentCard({ copy }) {
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [status, setStatus] = useState("");
  const [statusKind, setStatusKind] = useState("");
  const [pending, setPending] = useState(false);

  const publicClient = useMemo(
    () => createPublicClient({ chain: bsc, transport: http() }),
    [],
  );

  async function ensureChain() {
    if (!window.ethereum) {
      throw new Error(copy.noWallet);
    }
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (Number(chainId) !== CHAIN_ID) {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }],
      });
    }
  }

  async function connectWallet() {
    try {
      setStatus("");
      await ensureChain();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0] ?? "");
    } catch (error) {
      setStatusKind("error");
      setStatus(error instanceof Error ? error.message : copy.connectFailed);
    }
  }

  async function pay() {
    try {
      setPending(true);
      setStatus("");
      setStatusKind("");
      await ensureChain();

      let nextAccount = account;
      if (!nextAccount) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        nextAccount = accounts[0] ?? "";
        setAccount(nextAccount);
      }
      if (!nextAccount) throw new Error(copy.connectBeforePay);

      const value = Number(amount);
      if (!Number.isFinite(value) || value <= 0) {
        throw new Error(copy.invalidAmount);
      }

      await ensureChain();
      const walletClient = createWalletClient({
        chain: bsc,
        transport: custom(window.ethereum),
      });
      const decimals = await publicClient.readContract({
        address: USDT_ADDRESS,
        abi: USDT_ABI,
        functionName: "decimals",
      });
      const parsed = parseUnits(String(value), decimals);
      const data = encodeFunctionData({
        abi: USDT_ABI,
        functionName: "transfer",
        args: [getPayeeAddress(), parsed],
      });
      const hash = await walletClient.sendTransaction({
        account: nextAccount,
        to: USDT_ADDRESS,
        data,
      });
      setStatusKind("success");
      setStatus(`${copy.submitted} ${formatUnits(parsed, decimals)} USDT. Tx: ${hash}`);
      setAccount(nextAccount);
    } catch (error) {
      setStatusKind("error");
      setStatus(error instanceof Error ? error.message : copy.paymentFailed);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="address-card payment-card" id="fund">
      <span>{copy.network}</span>
      <label className="payment-field">
        <span>{copy.amount}</span>
        <div className="amount-input">
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="100"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            aria-label={`${copy.amount} USDT`}
          />
          <strong>USDT</strong>
        </div>
      </label>
      <div className="payment-field">
        <span>{copy.wallet}</span>
        <button type="button" className="connect-wallet-button" onClick={connectWallet}>
          {account ? shorten(account) : copy.chooseWallet}
        </button>
      </div>
      <button type="button" className="pay-button" disabled={pending} onClick={pay}>
        {copy.pay}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
      {status ? (
        <div className={`payment-status ${statusKind === "success" ? "success" : ""}`}>
          <span>{status}</span>
          {statusKind === "success" && status.includes("Tx: ") ? (
            <a
              href={`https://bscscan.com/tx/${status.split("Tx: ")[1]}`}
              target="_blank"
              rel="noreferrer"
            >
              {copy.bscscan}
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
