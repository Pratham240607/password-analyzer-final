#  Password Strength Analyzer

##  Project Overview

This is a **Single-Page Application (SPA)** built using fundamental web technologies to provide real-time analysis of password security. The primary function is to quantify a password's strength by calculating its **Shannon Entropy** and estimating the time required for a modern attacker to crack it via brute force.

The project was developed to demonstrate core web development skills (HTML/CSS/JS) combined with an understanding of essential **Cybersecurity and Information Theory concepts**.

---

##  Key Features

* **Entropy-Based Strength Calculation:** Strength is derived from a mathematical formula incorporating both password length and character set diversity (uppercase, lowercase, numbers, symbols).
* **Estimated Crack Time:** Provides a real-world assessment of security by calculating the time (in seconds, hours, days, or centuries) required for a powerful GPU cluster (assuming $10^{11}$ guesses per second) to break the password.
* **Animated Multi-Stage Flow:** Features a professional, three-stage user experience:
    1.  Input Screen
    2.  **Analysis Animation Screen**
    3.  Final Results Screen
* **Real-Time Feedback:** The strength bar and text feedback update instantly as the user types.
* **User Experience (UX) Enhancements:** Includes a "Show/Hide" password toggle and a strong password suggestion generator.

---

##  Technical Details and Logic

### 1. Core Algorithm: Shannon Entropy

Password strength (H) is calculated using the formula:
$$\text{Entropy (H)} = \text{Length} \times \log_{2}(\text{Search Space (S)})$$

* **Search Space (S):** Determined by the unique character sets present in the password (e.g., $S = 26 + 26 + 10 + 32 \approx 94$ if all types are used).
* **Crack Time:** Calculated using the total number of combinations ($2^H$) divided by the assumed cracking speed.

### 2. Technologies Used

* **HTML5:** Structural foundation.
* **CSS3:** Styling, animations (spinners, color transitions), and the **Blue/Black Dark Mode Theme**.
* **JavaScript (ES6):** Controls user events, page transitions (`setTimeout`), logic implementation, and DOM manipulation.

---

##  Live Demonstration

The project is hosted publicly using **GitHub Pages**.

**View Live Demo Here:**

https://pratham240607.github.io/password-analyzer-final/


##  Setup Instructions (For Reviewers/Developers)

This is a static website and requires no backend setup.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/pratham240507/password-analyzer-final.git](https://github.com/pratham240507/password-analyzer-final.git)
    ```
    (Note: Replace the username/repo name if yours is different)
2.  **Open the folder.**
3.  **Double-click `index.html`** in any web browser to run the application locally.
