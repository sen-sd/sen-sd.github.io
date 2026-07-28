---
title: "From Idea to Reality: Simulating a Hospital Environment Before On-Premises Deployment"
category: insights
date: 2026-06-22
excerpt: "Before a Kumamoto hospital MicroK8s deployment, we built a production-like office simulation, ran a full pilot install, and cut on-site work from days to 2–3 hours."
readTime: 8
---

# From Idea to Reality: Simulating a Hospital Environment Before On-Premises Deployment

<figure>
  <img src="/assets/images/Kumamoto-20260622/0_icon.jpeg" alt="Kumamon, the mascot of Kumamoto Prefecture">
  <figcaption>Kumamoto calling — business trip mode: ON</figcaption>
</figure>

During a recent business trip to **Kumamoto**, our team deployed an on-premises application platform at a hospital. The applications were hosted on a **MicroK8s** (MicroKubernetes) cluster.

<figure>
  <img src="/assets/images/Kumamoto-20260622/1_To_kumamoto.jpeg" alt="Jetstar flight on the tarmac en route to Kumamoto">
  <figcaption>On the way to Kumamoto</figcaption>
</figure>

<figure>
  <img src="/assets/images/Kumamoto-20260622/2_at_airport.jpeg" alt="At the airport during the Kumamoto trip">
  <figcaption>At the airport</figcaption>
</figure>

<figure>
  <img src="/assets/images/Kumamoto-20260622/3_at_airport_honda_display.jpeg" alt="Honda display at the airport">
  <figcaption>Airport stop — Honda display</figcaption>
</figure>

<figure>
  <img src="/assets/images/Kumamoto-20260622/4_at_airport.jpeg" alt="Airport scene during the Kumamoto deployment trip">
  <figcaption>Travel day details before on-site work</figcaption>
</figure>

Before the deployment, I had a simple idea:

> Why don't we build a virtual environment in our office that closely simulates the hospital's infrastructure and complete the installation as a pilot before going on-site?

The objective was straightforward: identify and resolve infrastructure-related issues before arriving at the hospital, where deployment time is limited and every hour matters.

## Simulating the Hospital Environment

We created a virtual environment that mirrored the hospital's network as closely as possible. This included:

- WAN configuration matching the hospital's Internet connectivity
- LAN configuration matching the hospital's internal network
- DNS server settings
- NTP server configuration
- External firewall requirements
- Network routing and communication
- MicroK8s installation and application deployment

To ensure accuracy, we prepared a detailed deployment checklist and discussed every networking requirement with the hospital's network team. Their inputs allowed us to align our virtual environment with the actual hospital infrastructure.

<figure>
  <img src="/assets/images/Kumamoto-20260622/5_famaous_amimation_display.jpeg" alt="Famous animation display during the Kumamoto trip">
  <figcaption>A short cultural pause before deployment day</figcaption>
</figure>

<figure>
  <img src="/assets/images/Kumamoto-20260622/5.1_evening_food.jpeg" alt="Evening meal in Kumamoto">
  <figcaption>Evening food in Kumamoto</figcaption>
</figure>

<figure>
  <img src="/assets/images/Kumamoto-20260622/5.2_evening_food.jpeg" alt="More evening food in Kumamoto">
  <figcaption>Local dinner after a long travel day</figcaption>
</figure>

<figure>
  <img src="/assets/images/Kumamoto-20260622/5.3_evening_food.jpeg" alt="Evening meal dishes in Kumamoto">
  <figcaption>Fuel for the next day's deployment</figcaption>
</figure>

<figure>
  <img src="/assets/images/Kumamoto-20260622/5.4_evening_food.jpeg" alt="Evening dining in Kumamoto">
  <figcaption>Team dinner before hospital on-site work</figcaption>
</figure>

## Running a Pilot Deployment

Once the environment was ready, we performed a complete pilot deployment in the office, following the exact installation procedure that would later be used at the hospital.

This pilot helped us:

- Validate the deployment process from start to finish.
- Verify network communication between all components.
- Detect configuration issues before traveling.
- Refine the deployment checklist.
- Increase confidence that the on-site installation would be successful.

## The Result

<figure>
  <img src="/assets/images/Kumamoto-20260622/6_to_deploy_onpromise_system_at-hospital.jpeg" alt="Hospital aquarium with a clownfish during the on-premises deployment">
  <figcaption>On-site at the hospital — deploying the on-premises system</figcaption>
</figure>

Because most of the validation had already been completed in the simulated environment, the actual deployment at the hospital was smooth.

What could typically take **2–4 days** was completed in just **2–3 hours**.

## The Engineering Principle

This approach reflects the **Shift-Left** mindset in DevOps and Site Reliability Engineering.

Instead of waiting to troubleshoot issues in the production environment, we moved infrastructure validation and deployment testing to an earlier stage by creating a production-like simulation and executing a pilot installation.

The result was lower deployment risk, fewer surprises, faster implementation, and more time to focus on supporting the customer rather than solving avoidable infrastructure issues.

## Final Thoughts

Sometimes the biggest innovation is not a new technology—it is a better process.

The idea of **"simulate first, deploy second"** transformed our deployment approach. By investing time in creating a realistic pilot environment, we significantly reduced on-site deployment time and improved the overall reliability of the implementation.

**Plan. Simulate. Pilot. Deploy with confidence.**

<figure>
  <img src="/assets/images/Kumamoto-20260622/7_return_and_reached.jpeg" alt="Return trip after the Kumamoto hospital deployment">
  <figcaption>Return and reached — deployment complete</figcaption>
</figure>
