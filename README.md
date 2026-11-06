[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/uP38PorS)

# IADI Booking App

## Repository Overview

An apartment booking application with a React / TypeScript client and a Kotlin / Spring Boot REST API. Clients can browse apartments and book stays, owners can define availability, and managers can review reservation requests. The application also supports reservation status tracking and reviews.

Source code is split between [Client/](Client/) and [Server/](Server/). The [Final delivery/](Final%20delivery/) directory contains the project report, presentation, and video demonstration.

---

## Controls

Use the on-screen links, buttons, and calendar, and type into form fields. Available actions depend on the signed-in role and reservation status.

- **Sign in:** click **Login**, enter your username and password, and submit the form.
- **Browse apartments:** choose **Apartments** in the sidebar, use **Previous** / **Next** for more results, and click an apartment's name to open its details.
- **Book a stay (client):** open **Calendar**, select the start and end dates, adjust the number of people with `-` / `+`, and click **Book now**.
- **Set availability (owner):** open an apartment's **Calendar**, select a date range, and click **Add period of availability**.
- **Manage reservations:** clients and managers use **Reservations** in the sidebar; owners use **List of Reservations** on an apartment's details page. Open a reservation to see its available actions. Managers can **Accept** / **Reject** requests; clients can **Cancel**, **Check In**, **Check Out**, or **Make review** when the corresponding action is available.
- **Sign out:** click **Sign Out** in the sidebar.

## Testing Notes

The original submission includes controller tests covering success, error, and security cases, with partial Mockito coverage.
