# 🕵️‍♀️ Whisp

> **Whisp lets you speak without being seen.**  
> A decentralized signalling platform where users can broadcast **verifiable messages anonymously** using **zero-knowledge proofs** on the **Status Network**.  

---

## 🌐 TL;DR

Whisp is a **privacy-first social signalling protocol** where verified individuals can send **trustworthy signals like feedbacks/votes without revealing their identity**.  

It uses **Semaphore** for anonymous group proofs, **Status Network** for censorship-resistant verification, and **Buidl Guidl** tooling for seamless development and smart contract deployment.

> 💡 Think “verified whispers” — truthful, anonymous, and onchain.

---

## 🎯 Problem

Online spaces force a binary choice:
- **Anonymous = untrustworthy**  
- **Verified = exposed**

Communities, DAOs, and whistleblowers need a way to **prove they belong** without revealing **who they are**.

Traditional platforms rely on centralized trust — admins, servers, or moderators — introducing bias, risk, and censorship.

---

## 💡 Solution — *Whisp*

Whisp enables **verifiable anonymity** through zero-knowledge proofs.  
It allows anyone to post a **signal** (vote, opinion, alert) verified by math — not by trust.

- 🧠 **Zero-Knowledge Proofs** — users prove they’re group members without revealing their identity  
- 🔗 **Onchain Verification** — proofs verified by smart contracts on **Status Network**  
- 🔒 **Anonymous but Accountable** — one signal per identity, no duplicates or Sybil attacks  

---

## 🧩 How It Works

1. **Create a Whisp Identity**
   - User generates a **Semaphore identity** (private key never leaves device).  

2. **Join a Group**
   - Group = community, company, or verified list.
   - Each group has an onchain group ID.

3. **Send a Whisp**
   - User creates a **ZK proof** showing:
     - Membership in group ✅  
     - Unique signal nullifier 🆔  
   - Proof sent to the Whisp smart contract.

4. **Verify & Broadcast**
   - Smart contract verifies the proof.  
   - Emits an event on Status Network → Whisp frontend fetches it → signal displayed anonymously.

---

## 🏗️ Architecture


| Layer | Technology |
|-------|-------------|
| ZK Layer | Semaphore Protocol |
| Smart Contract | Solidity + Foundry + Buidl Guidl Stack |
| Blockchain | Status Network |
| Frontend | Next.js + TailwindCSS + Viem |
| Deployment | Vercel (Frontend) + Status Explorer (Contracts) |

---

## ⚙️ Tech Stack

| Category | Tools / Frameworks |
|-----------|--------------------|
| 🧱 Smart Contracts | Solidity, Hardhat |
| 🔐 Zero-Knowledge | Semaphore, SnarkJS |
| 🌐 Blockchain | Status Network |
| 💻 Frontend | Next.js, TailwindCSS |
| 🧰 Tooling | Buidl Guidl, Viem, Ethers.js |
| ☁️ Hosting | Vercel |

---

## 🧠 Example Use Cases
 
- 🕵️ **Whistleblower Portal:** prove affiliation, stay safe  
- 💬 **Private Group Chats:** anonymous verified discussions  
- 🔔 **Signal Feed:** send onchain proofed messages for coordination  



## 🔭 Future Roadmap

- 🧩 **Self Protocol Integration** — nationality/age/gender based group entry  
- 💬 **Onchain Group Messaging** — zk-based chatrooms  
- 🪙 **Reputation Points** — build trust without identity  

---

## 🛡️ Why Status Network?

We chose **Status Network** because it aligns with Whisp’s mission —  
> “Privacy, freedom, and trustless communication.”

- ⚡ Gas-efficient zk verification  
- 🔐 Native privacy tooling  
- 🌐 Decentralized communication layer  
- 💬 Vibrant developer community  

---

## 👥 Team

**Built by:**

- 🧑‍💻 **Akhil** — Full Stack + ZK Dev  
- 🧑‍💻 **Kutman** — Frontend Dev  
