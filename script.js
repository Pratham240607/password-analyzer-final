document.addEventListener('DOMContentLoaded', () => {
    // --- Element Declarations ---
    const passwordInput = document.getElementById('passwordInput');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const strengthIndicator = document.getElementById('strengthIndicator');
    const feedbackText = document.getElementById('feedbackText');
    const analyzeButton = document.getElementById('analyzeButton');

    // Screen elements
    const splashScreen = document.getElementById('splash-screen');
    const mainAnalyzer = document.getElementById('mainAnalyzer');
    const animationScreen = document.getElementById('animationScreen');
    const resultsScreen = document.getElementById('resultsScreen');

    // Results elements
    const finalStrengthIndicator = document.getElementById('finalStrengthIndicator');
    const finalFeedbackText = document.getElementById('finalFeedbackText');
    const finalBreakTime = document.getElementById('finalBreakTime');
    const suggestButton = document.getElementById('suggestButton');
    const suggestedPasswordOutput = document.getElementById('suggestedPassword');
    const restartButton = document.getElementById('restartButton');

    let currentPassword = '';
    let currentFeedback = { strength: '', feedback: '', time: '...' };

    // --- 1. Initial Splash Screen Fade Out ---
    // Start by ensuring the main analyzer is initially hidden via JS, overriding CSS only if necessary
    mainAnalyzer.style.opacity = '0';
    mainAnalyzer.style.display = 'none';
    resultsScreen.style.opacity = '0';
    resultsScreen.style.display = 'none';
    
    setTimeout(() => {
        splashScreen.style.opacity = '0'; 
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainAnalyzer.style.display = 'flex'; // Use flex for centering
            setTimeout(() => {
                mainAnalyzer.style.opacity = '1';
            }, 50);
        }, 1000); 
    }, 3000); 

    // --- 2. Live Password Analysis (on input page) ---
    passwordInput.addEventListener('input', () => {
        analyzePassword();
        // Enable/Disable the ANALYZE button
        analyzeButton.disabled = passwordInput.value.length === 0;
    });

    // --- 3. Show/Hide Password Feature ---
    togglePasswordBtn.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePasswordBtn.textContent = 'HIDE';
        } else {
            passwordInput.type = 'password';
            togglePasswordBtn.textContent = 'SHOW';
        }
    });

    // --- 4. Transition to Results ---
    analyzeButton.addEventListener('click', () => {
        // Hide the main page
        mainAnalyzer.style.opacity = '0';
        setTimeout(() => {
            mainAnalyzer.style.display = 'none';
            
            // Show the animation page
            animationScreen.style.display = 'flex'; // Must be 'flex' to center content
            
            // Force browser to render animationScreen now before starting transition
            animationScreen.style.opacity = '1';

            // Wait 2 seconds, then transition to the results
            setTimeout(() => {
                animationScreen.style.opacity = '0';
                setTimeout(() => {
                    animationScreen.style.display = 'none';
                    displayResults(); // Show the results page
                }, 500); 
            }, 2000); 

        }, 500); // Wait for mainAnalyzer fade-out
    });

    // --- 5. Restart Feature ---
    restartButton.addEventListener('click', () => {
        // Clear inputs and state
        passwordInput.value = '';
        togglePasswordBtn.textContent = 'SHOW';
        passwordInput.type = 'password';
        strengthIndicator.className = 'strength-bar';
        feedbackText.textContent = 'Start typing to see the analysis.';
        analyzeButton.disabled = true;

        // Hide results and show analyzer
        resultsScreen.style.opacity = '0';
        setTimeout(() => {
            resultsScreen.style.display = 'none';
            mainAnalyzer.style.display = 'flex';
            setTimeout(() => {
                mainAnalyzer.style.opacity = '1';
            }, 50);
        }, 500);
    });

    // --- 6. Core Analysis Logic (Modified to store results) ---

    function analyzePassword() {
        currentPassword = passwordInput.value;
        if (currentPassword.length === 0) {
            strengthIndicator.className = 'strength-bar';
            feedbackText.textContent = 'Start typing to see the analysis.';
            analyzeButton.disabled = true;
            return;
        }

        const hasLower = /[a-z]/.test(currentPassword);
        const hasUpper = /[A-Z]/.test(currentPassword);
        const hasNumber = /\d/.test(currentPassword);
        const hasSymbol = /[!@#$%^&*()_+={}[\]:;"'<,>.?/\\|]/.test(currentPassword);
        const length = currentPassword.length;

        let searchSpace = 0; 
        if (hasLower) searchSpace += 26;
        if (hasUpper) searchSpace += 26;
        if (hasNumber) searchSpace += 10;
        if (hasSymbol) searchSpace += 32;

        let entropy = 0;
        if (searchSpace > 0) {
            entropy = length * (Math.log2(searchSpace));
        }
        
        let score = Math.min(Math.round(entropy * 3), 100);
        
        let strength = 'weak';
        let feedback = '';

        if (score >= 80 && length >= 12) {
            strength = 'strong';
            feedback = 'Strong! This password is highly secure.';
        } else if (score >= 50 && length >= 8) {
            strength = 'medium';
            feedback = 'Medium. Aim for 12+ characters and more variety.';
        } else {
            strength = 'weak';
            feedback = 'Weak. Needs to be longer and include varied characters.';
        }
        
        let suggestions = [];
        if (length < 12) suggestions.push('Longer length (12+ characters)');
        if (!hasUpper) suggestions.push('Uppercase letters');
        if (!hasLower) suggestions.push('Lowercase letters');
        if (!hasNumber) suggestions.push('Numbers');
        if (!hasSymbol) suggestions.push('Symbols (like !@#$)');
        
        if (strength === 'weak' || strength === 'medium') {
            feedback += `<br> **Suggestions:** Add ${suggestions.join(', ')}.`;
        }

        // Update the live feedback on the input page
        strengthIndicator.className = `strength-bar ${strength}`;
        feedbackText.innerHTML = feedback;

        // Store results for the final screen
        const guessesPerSecond = 100000000000; 
        const totalTimeSeconds = Math.pow(2, entropy) / guessesPerSecond;
        
        currentFeedback = {
            strength: strength,
            feedback: feedback,
            time: formatTime(totalTimeSeconds)
        };
    }

    // --- 7. Display Final Results ---

    function displayResults() {
        // 1. Set the strength and feedback
        finalStrengthIndicator.className = `strength-bar large-strength ${currentFeedback.strength}`;
        finalFeedbackText.innerHTML = currentFeedback.feedback;

        // 2. Set the crack time
        finalBreakTime.textContent = currentFeedback.time;

        // 3. Show the results page
        resultsScreen.style.display = 'flex';
        setTimeout(() => {
            resultsScreen.style.opacity = '1';
        }, 50);
    }
    
    // --- 8. Helper Functions ---

    function formatTime(seconds) {
        if (seconds < 1) return 'Instantly (less than 1 second)';
        if (seconds < 60) return `${Math.round(seconds)} seconds`;

        const minutes = seconds / 60;
        if (minutes < 60) return `${Math.round(minutes)} minutes`;

        const hours = minutes / 60;
        if (hours < 24) return `${Math.round(hours)} hours`;

        const days = hours / 24;
        if (days < 365) return `${Math.round(days)} days`;

        const years = days / 365.25;
        if (years < 1000) return `${Math.round(years)} years`;

        const centuries = years / 100;
        return `${centuries.toFixed(2)} centuries`;
    }

    suggestButton.addEventListener('click', () => {
        const suggestedPassword = generateStrongPassword(16); 
        suggestedPasswordOutput.textContent = suggestedPassword;
    });

    function generateStrongPassword(length) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+={}[];:'\"<,>.?/\\|";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }
});