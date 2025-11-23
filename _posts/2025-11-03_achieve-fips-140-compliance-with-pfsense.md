---
title: "How to Achieve FIPS 140 Compliance with pfSense (Even Though pfSense Is Not FIPS 140 Certified)"
category: tutorial
date: 2025-11-03
excerpt: "Learn how to design a pfSense-based architecture that supports FIPS 140 compliance using compensating controls and external validated components, even though pfSense itself is not FIPS 140 certified."
readTime: 8
---

## ✅ Introduction

Organizations handling sensitive or regulated data—such as healthcare, finance, or government—often require FIPS 140-2/3 compliant cryptographic controls.

However, pfSense is not FIPS 140 validated, and the pfSense team has confirmed that no FIPS certification is available for its software crypto modules.

So does this mean pfSense cannot be used in a FIPS-regulated environment?

**Not necessarily.**

This blog explains how to design a pfSense-based architecture that supports FIPS 140 compliance, using compensating controls and external validated components.

---

## ❗ Important Clarification

### ✅ pfSense is NOT FIPS 140 certified

- No FIPS-validated cryptographic module in pfSense
- OpenSSL used by pfSense is not validated
- No FIPS mode available (unlike RHEL or Windows Server)

### ✅ But pfSense can be used in a FIPS-controlled environment

Only if:

- pfSense is not part of the cryptographic boundary
- All crypto operations are offloaded to FIPS-validated systems

---

## ✅ Strategy: Make pfSense "FIPS-Aligned" Instead of FIPS-Certified

### 1. Move Cryptographic Functions Outside pfSense

Ensure pfSense does not terminate encryption.

**Use:**

- TLS termination on FIPS-validated servers
- AWS ALB/NLB + ACM (FIPS validated)
- Azure Application Gateway (FIPS 140-2)
- On-prem HSM / FIPS-certified appliance

**pfSense acts only as:**

- Router
- Firewall
- Packet filter
- NAT device

### 2. Use FIPS-Approved IPsec Cipher Suites

Configure pfSense IPsec Phase 1 / Phase 2 with:

**Allowed Algorithms (FIPS-approved):**

- AES-GCM-128/256
- AES-CBC-128/256
- SHA-256 / SHA-384
- DH Group 14+ (2048-bit)
- ECDH (secp256r1 / secp384r1)

**Avoid:**

- 3DES
- SHA-1
- DH group 2/5

Even though pfSense crypto is not validated, using FIPS-approved algorithms supports compliance justification.

### 3. Use Hardware with FIPS 140 Validated Crypto

If required:

✅ **Use external devices such as:**

- VPN concentrators
- FIPS-validated firewalls (Fortinet, Cisco, Palo Alto)
- HSM-based TLS termination

pfSense remains outside FIPS boundary.

### 4. Implement Compensating Security Controls

**Examples:**

- Mutual TLS (mTLS) between endpoints
- Certificate pinning
- No private key stored on pfSense
- Disable weak ciphers globally
- Strict TLS logging without packet decryption

This supports NIST & healthcare compliance (e.g., Japan medical guidelines).

