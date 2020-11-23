# Availability Calculator

An open source service to calculate the daily availability based on an agenda.

## Table of Contents

1. [Availability Calculator](#availability-calculator)
2. [Table of Contents](#table-of-contents)
3. [Context of the problem](#context-of-the-problem)
    1. [Existing tools](#existing-tools)
4. [Solution](#solution)
5. [Prerequisites](#prerequisites)
6. [Running](#running)
7. [Testing](#testing)
8. [License](#license)

## Context of the problem

Due to the new normality caused by the COVID-19 pandemic, most of students and employees were forced to work at home, which caused many new problems that had to be solved. One of those problems is the one related to time management.

### Existing tools

Even though there are many other tools to be ready for use in a public web site, many of those are an overkill for certain tasks, like knowing my percentage of daily availability based on my events in a particular day. Many examples are [Google Calendar][4], [Apple Calendar][5], [Microsoft Outlook Calendar][6], and many others (as listed in [this][7] Zapier blog post).

[return to the top.](#table-of-contents)

## Solution



[return to the top.](#table-of-contents)

## Prerequisites

You will need [Leiningen][1] 2.0 or above installed.
Optionally, you will need [NodeJS][2] 8.10 or above and [Yarn][3] 1.0 or above installed to be able to run the web application.

[return to the top.](#table-of-contents)

## Running

To start a web server for the application, run:

    lein run 

To start the web application, run:

    lein run-web

[return to the top.](#table-of-contents)

## Testing

To test the web server, run:

    lein eftest

[return to the top.](#table-of-contents)

## License

Copyright © 2020 Topiltzin Hernández Mares

Distributed under the GNU General Public License version 3.0.

[return to the top.](#table-of-contents)

[1]: https://github.com/technomancy/leiningen
[2]: https://github.com/nodejs/node
[3]: https://github.com/yarnpkg/yarn
[4]: https://calendar.google.com
[5]: https://support.apple.com/guide/icloud/what-is-icloud-calendar-mmd67283e4/icloud
[6]: https://support.office.com/en-us/article/welcome-to-your-calendar-6fb9225d-9f9d-456d-8c81-8437bfcd3ebf
[7]: https://zapier.com/blog/best-calendar-apps/
