# CS208 Full Stack Final Project - Donut Shop Application

- Name: Adeline Kropf
- GitHub: [https://github.com/AdelineKropf](https://github.com/AdelineKropf)
- Term: Spring 2026

## Project Description

This project is a full-stack web application created for a fictional client
called Downtown Donuts which is a family-owned donut and coffee shop. The 
goal was to design and prototype a modern, cozy, and mobile-friendly website 
that reflects the shop’s brand and allows it to showcase its menu, link to 
online ordering services, share its story and history, improves its online 
presence to help increase foot traffic, and allow customers to post comments 
on the website. 

The application includes:
- A Landing Page with navigation and ordering links
- A Menu Page showcasing products and ordering links
- An About Us Page telling the company’s story and history
- A Customer Comments Page with full-stack functionality (users can submit 
  and view comments)

The backend is built with Node.js and Express, and the database uses MariaDB 
(MySQL). The frontend uses Pug templates and custom CSS (no frameworks).

Please read the following instructions carefully because some of the setup 
only needs to be done once.

## Install the Database

To set up the database, run the `install_db.sh` script in the setup_scripts
directory. This script will install MariaDB and start the server running. 
You only need to run this script once per Codespace.

```bash
./setup_scripts/install_db.sh
```
Use the following for questions that the script asks:

- Switch to unix_socket authentication [Y/n] n
- Change the root password? [Y/n] Y
  - Set the password to 12345
- Remove anonymous users? [Y/n] Y
- Disallow root login remotely? [Y/n] Y
- Remove test database and access to it? [Y/n] Y
- Reload privilege tables now? [Y/n] Y

Test to make sure the db is running:

```bash
sudo service mariadb status
```

You should see something similar to what is shown below.
```
* /usr/bin/mariadb-admin  Ver 10.0 Distrib 10.11.13-MariaDB, for debian-linux-gnu on x86_64
Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Server version          10.11.13-MariaDB-0ubuntu0.24.04.1
Protocol version        10
Connection              Localhost via UNIX socket
UNIX socket             /run/mysqld/mysqld.sock
Uptime:                 10 min 23 sec

Threads: 1  Questions: 90  Slow queries: 0  Opens: 33  Open tables: 26  Queries per second avg: 0.144
```

## Create the Database Tables

Create the initial tables by running the following command:

```bash
sudo mysql -u root -p < ./setup_scripts/create_demo_table.sql
```

Check to make sure the tables were created correctly
```bash
mysql -u root -p -e 'show databases;'
```

```
Enter password:
+--------------------+
| Database           |
+--------------------+
| cs208demo          |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
```

## Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

## Run the Application

Start the application using the following command:

```bash
npm start
```

## Access the Application

On Codespaces, you can access the application by forwarding port 3000. Open 
the forwarded port in your browser to view the application.

## Design Decisions

1. Cozy, Minimal Color Palette

    I followed the client’s request for a “cozy, minimal, modern” feel by 
    using:

    - Dark green (#10291D) for dark backgrounds on pages, or sections of 
      pages.
    - Seasalt (#F7F7F7) for backgrounds and text on colored backgrounds.
    - Saffron (#F7C64A) for dividing lines, decorative elements, and the 
      logo when on a dark background

    This creates a café-like atmosphere while maintaining strong contrast 
    for accessibility.

2. Responsive Layout Using Flexbox + Media Queries

    Instead of using a CSS framework, I built responsiveness using:

    - Flexbox (flex-wrap, justify-content)
    - Relative units and clamp() for scaling
    - Custom media queries (480px, 600px, 900px)

    This ensures the site works well on phones, tablets, and desktops.

3. Server-Side Rendering for Comments

    The comments system is fully server-rendered instead of relying on 
    client-side JavaScript. This allowed me to:

    - Handle validation securely on the server
    - Keep the UI consistent after errors
    - Simplify data flow and debugging

4. Accessible Navigation

    I used semantic HTML and anchor links instead of JavaScript buttons 
    (where applicable). This improves:

    - Keyboard navigation
    - Accessibility compliance
    - Simplicity of routing

## Edge Cases

1. Server/API Unreachable

    If the database or server fails:

    - The application returns a friendly error message instead of crashing
    - Users see messages like “Something went wrong. Please try again.”
    - The UI remains intact and usable.

2. Empty or Whitespace Comments

    Before inserting into the database:

    Input is trimmed using .trim()
    If empty, the comment is rejected
    The page reloads with an error message:
    “Comment cannot be empty”

3. Extremely Long Input (e.g., 10,000 characters)

    I implemented both client-side and server-side validation for comment 
    input. The textarea includes a maxlength attribute to guide the user 
    and prevent excessively long input on the client side. However, I also 
    enforce a strict character limit on the server (255 characters) to 
    ensure that invalid or manipulated requests cannot bypass validation.

    For the server side, it enforces a max length of 255 characters.
    If exceeded:
    - The comment is rejected and a clear message is shown:
    “Comment cannot exceed 255 characters”
    - This prevents database overflow and UI issues

4. Rapid Double-Click Submission

    Handled in two ways:

    - Client-side: Submit button is disabled after clicking
    - Server-side: Duplicate submissions are safely handled and do not 
                   crash the system

    This prevents duplicate entries and improves user experience.

## Challenges & Learnings

1. Handling Validation While Preserving UI State

    - Challenge:
    When validation failed, the page would reload without showing existing 
    comments.

    - Solution:
    I created a helper function that reloads comments from the database and 
    re-renders the page with an error message.

    - What I learned:
    Server-side rendering requires careful control of data flow to maintain 
    UI consistency.

2. Implementing Pagination Without Front-End JavaScript

    - Challenge:
    Initially, I considered using JavaScript for “Load More,” but the 
    requirement emphasized backend logic.

    - Solution:
    I implemented pagination using query parameters (?limit=10) and 
    server-side rendering.

    - What I learned:
    Pagination can be handled cleanly on the server using SQL LIMIT and 
    query parameters.

3. Responsive Design Without Frameworks

    - Challenge:
    Creating a fully responsive layout without Bootstrap, Tailwind, 
    Bulma or any similar library.

    - Solution:
    Used Flexbox, clamp(), and custom media queries.

    - What I learned:
    Understanding layout fundamentals gives more control than relying 
    on frameworks.


## Citations
All sources are cited next to where they are used as well 
- https://www.geeksforgeeks.org/node-js/tags-in-pug-view-engine/
- Copilot 
- https://www.1001fonts.com/italianno-font.html 
- https://www.1001fonts.com/montserrat-font.html
- https://www.w3schools.com/CSS/css_list.asp
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp