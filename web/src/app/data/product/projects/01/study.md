---
id: 1
title: Full-Stack @ Fidelity
date: Summer 2024
work: Internship
discipline: Full-stack software enginnering, Product design
tech stack: AWS, Linux, Windows, Python Django, Terraform, Jenkins
team: Me, Jenny Nguyen, Shashwat Ghevde
special thanks: Alec Chum, Nikki Bratten, The rest of the MFT & CAPE team
---

![Fidelity Investments](/product/01/FidelityCover.jpg)

Software moves slowly at Fidelity. Dependency means everything, and trusted and established products will always reign supreme over flashy but potentially volatile newcomers. But what happens when once powerful tools grow old? At Fidelity, change in the Managed File Transfer (MFT) space had to be embraced. Coming in with fresh eyes and zero background in MFT software, it was my job to help push Fidelity’s file transferring practices into a new exciting era.
  
## A quick note

  Note that due to a non-disclosure agreement I signed before working as an intern, I was unable to take any work produced with me after the internship concluded.

  The case study text and corresponding visuals (including all wireframes) are limited in detail and were produce by me in retrospect.

  If you would like further information, please reach out to me <3

## Background

  In January 2024, I signed an offer to join Fidelity in the summer as a full-stack software engineering intern. As a member of CAPE (Cloud and Platform Engineering), I sat on the Managed File Transfer (MFT) team alongside two other interns. Initially tasked only with producing a feasibility study for a third-party MFT application, we pitched and then began work on a internal full-stack app MVP to provide Fidelity clients and employees with a universal MFT solution.

### Introduction to MFT in Fidelity

  Managed file transfer (MFT) software is vital for people and groups who want to securely exchange data. A financial company like Fidelity wants to keep their intellectual property private as well as maintain their reputation of being a trustworthy fiduciary. Especially given that the company wards off thousands of hack attempts in a given day, powerful and easy-to-use MFT software is paramount for the company’s continued success.

  ![Fidelity had just decided to push their MFT software onto the cloud and leave inefficient servers systems in the past.](/product/01/FidelityExtra1.jpg)

  When I arrived in June, the MFT team was beginning an era of far-reaching change. The on-prem MFT servers that the company had used for several years were becoming increasingly unsustainable. Compared to the cloud, on-prem servers have a fixed price point that does not fluctuate even though usage will realistically fall and rise throughout a calendar year. Its rigidness leaves Fidelity footing an unnecessarily expensive bill while also forcing them to scramble for inefficient backup options in the event of an outage.
  
  ![It was clear that less tech-savvy employees were struggling to juggle all the different MFT interfaces](/product/01/FidelityExtra2.jpg)
  
  Additionally, the MFT client connected to the server no longer was supported by the vendor, meaning any vulnerability in the system would not be rectified and no new features would be added. Finally, the outdated UI that was central to the software left employees struggling every week – many would take time out of their day to join my team’s office hours for troubleshooting. It was time for a change.

## Deliverables

Before we get to the design work, we must look through where it originated from.

### JScape Feasibility Study
  
  Jenny, Shash, and I were responsible for reviewing Redwood's JSCAPE (a MFT platform) and determining if it could perform optimally for Fidelity.

#### Research

  To find out what we needed from JScape, we started by looking at the functionality of our current system. From ad hoc to SFTP, we spent days testing the full set of features that the current workflow had to offer. We also attended office hours hosted by our mentors, where they would help employees set up accounts and troubleshoot. By simply sitting in the background of these Zoom meetings, we quickly knew what the existing MFT tools did well and where they fell short.

#### Testing

  Every Tuesday and Thursday afternoon was filled with a 2.5 hour meeting with Redwood (creators of JScape) representatives, as they answered our questions and guided us through the more complex features of their product. As an intern on the team, I led several meetings by walking through the software as other members took note.

#### Documenting & presenting final findings

  As the internship came to a close, we stopped meeting with Redwood and began to test the product individually. From seeing how many authentication methods are sufficiently supported to understanding what file size was too big for the server to handle, I conducted several tests and reported my findings to the leaders of CAPE and Enterprise Technology.
  While it was not a project I was expected to be given, I thought the experience of doing research on stakeholders, market competitors, and the necessary functionality of a potentially integrated product sparked my interest in product management and design to a higher level.

### MFT universal client MVP

  ![Our additional project – creating a universal MFT solution.](/product/01/FidelityExtra3.jpg)

  After only a week from receiving the feasibility study project, Shash, Jenny, and I looked at each other and knew we wanted to get our hands dirtier.
  
  As we were brought in to be full-stack software engineering interns, we craved creating a full-stack project. After attending a few days of office hours, we knew the problem we wanted to solve. We put together a slide deck, requested to meet with our bosses, and proposed our idea: an in-house web client bringing together multiple file protocols under a familiar UI. We knew that Fidelity employees were struggling to familiarize themselves with the nuances of each protocol’s application (SFTP, Ad Hoc, HTTPS, etc) and our coworkers in the MFT team were spending hours on call to support them. Bringing as many as the protocols together under one platform was the central goal. Crucially, by placing these powerful softwares all within an email user experience that is widely familiar, we would elevate the productivity of the company.

  How can we bring users a familiar interface while also adding unique touches to keep them grounded and aware of their actions? This was a central question that seeped into every design choice I ended up making.

  ![Too much user-familiarity may turn toxic quickly.](/product/01/FidelityExtra4.jpg)
  
  We used JScape’s API for all the central functionality and utilized a Python Django stack with Tailwind for seamless styling and backend management. By using the Figma handoff features, I was able to dramatically cut down time for our team between the design and implementation stages.

#### Foundation

  ![A reproduced wireframe of our web app](/product/01/Fidelity-1-alt.jpg)
  
  The core design is nothing you have not seen before. This is the purpose. Instead of trying to manufacture a completely novel interface, we believed that prioritizing user-familiarity was key.

  However, with user-familiarity can come complacency. To prevent this and make sure users understand the disctinctions between conventional email and our platform, we implemented some features to increase intention & conscious use.

  ![We know mistakes can be costly. Here, we reduce them dramatically.](/product/01/Fidelity-1-1.jpg)
  
#### The power of hovering

  A web app like this requires presenting lots of important info to users. How can you do this while keeping the content on first-view as minimal as possible? Hover effects, of course.

  ![Hover over any circle to view more information](/product/01/Fidelity-2-alt.jpg)
  
  ![Introducing the circular design element as a bridge to more information](/product/01/Fidelity-2-1.jpg)

#### Powerful software, powerful choices

  ![Users can select any protocol for file transferring and receiving.](/product/01/Fidelity-3-alt.jpg)
  
  ![A simple distinction between security grades can encourage more secure file sharing](/product/01/Fidelity-3-1.jpg)

  Ultimately, we were able to make a full Figma prototype and break ground on the coded MVP. While we would have liked to achieve more with the project, we established a meaningful foundation and left our work in the good hands of the rest our the team.

#### Other features
  
  *Automated renew requests*: When a file transfer has been sent over but you caught it too late, you can press a single button asking the sender to prolong the expiration date of files. If the initial sender approves, the user would get 48 hours to download the files before they are completely removed from the servers.

  *Internal-to-internal communication for the request would differ from internal-to-external, and users could opt to add an additional message.
  
  *Individual & team inboxes*: While many file transfers are from individual to individual, some files should be accessed by all members of a team. Rather than listing every recipient, a sender can add a team mailbox, and each user will have a chance to download the files independently.

  *Admin mode*: For managers on teams, they can dictate what protocols and processes are available to their members. They would be able to send file transfers like all others users while also having an additional dashboard accessible to them.

## Reflection

  The two plus months I spent in the Merrimack office surprised me in almost every way.

  I gained a lot of perspective on what it means to work on software within the financial world. My co-interns and I expected to be done with the feasibility study in a matter of weeks. To our surprise, we soon learned that this was naive. We needed to get past company security checkpoints, troubleshoot with outside firms, and generally, do lots and lots of waiting. We were only able to wrap things up in our penultimate week and were not able to finalize as much of the MVP as we would have liked. This is not a damning indictment on us or the company but simply just the realities of the job – outside factors may bring your most menial tasks to a screeching halt.

  These slight disappointments exist, but they do not change the fact that the internship was a wonderful experience.

  Beyond my work as a full-stack software engineer, I had become the team’s defacto scrum master and product designer. I crafted the Figma prototype central to our MVP, curated the slides decks used in senior member presentations, and conducted research for a product prototype.

  In just ten weeks, I dove deep into the world of MFT, presented my work to various groups of senior leadership, did work befitting of a several product roles, and even sprinkled in some intense pickleball playing (me and Melissa still have our undefeated record btw {Shash and Jackson that one "win" doesn't count}).

  It was a wonderful second internship and I will forever be grateful for all who made it possible <3

  ![<3](/product/01/FidelityCloser.jpeg)
  
## Question/notes for myself
  
  From Bryant: How do you want to brand yourself? What do you want people to instantly think of when your name or your work comes up?

  From Nikki: Work is not a sprint, it is a marathon.
