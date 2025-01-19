document.addEventListener('DOMContentLoaded', () => {
    // عناصر الواجهة
    const subjectsContainer = document.querySelector('.subjects-container');
    const questionContainer = document.querySelector('.question-container');
    const mathButton = document.getElementById('math-btn');
    const scienceButton = document.getElementById('science-btn');
    const arabicButton = document.getElementById('arabic-btn');
    const questionText = document.getElementById('question-text');
    const questionImage = document.querySelector('.question-image');
    const repeatAnswerButton = document.getElementById('repeat-answer');
    const recordButton = document.getElementById('record-answer');
    const stopRecordButton = document.getElementById('stop-record');
    const showAnswerButton = document.getElementById('show-answer');
    const playAudioButton = document.getElementById('play-audio');
    const resultMessage = document.getElementById('result-message');

    // بيانات الأسئلة
    const questions = {
        math: [
            { text: "ما هو ناتج جمع ٥ + ٣؟", image: "math1.jpg", answer: "ثمانية" },
            { text: "ما هو ناتج طرح ١٠ - ٤؟", image: "math2.jpg", answer: "ستة" }
        ],
        science: [
            { text: "ما هو أكبر كوكب في المجموعة الشمسية؟", image: "science1.jpg", answer: "المشتري" },
            { text: "ما هو العنصر الكيميائي للذهب؟", image: "science2.jpg", answer: "Au" }
        ],
        arabic: [
            { text: "ما هو جمع كلمة 'كتاب'؟", image: "arabic1.jpg", answer: "كتب" },
            { text: "ما هو ضد كلمة 'سعيد'؟", image: "arabic2.jpg", answer: "حزين" }
        ]
    };

    let currentSubject = null;
    let currentQuestionIndex = 0;
    let recordedAnswer = "";
    let mediaRecorder;
    let audioChunks = [];
    let audioUrl = null;
    let lastClickTime = 0; // متغير لتتبع آخر وقت ضغط على الزر
    const clickDelay = 3000; // تأخير 3 ثواني بين الضغطات
    let mediaStream = null; // متغير لحفظ تيار الصوت بعد الحصول على الإذن

    // عرض أسئلة الرياضيات
    mathButton.addEventListener('click', () => {
        currentSubject = 'math';
        showQuestion();
    });

    // عرض أسئلة العلوم
    scienceButton.addEventListener('click', () => {
        currentSubject = 'science';
        showQuestion();
    });

    // عرض أسئلة لغتي
    arabicButton.addEventListener('click', () => {
        currentSubject = 'arabic';
        showQuestion();
    });

    // عرض السؤال
    function showQuestion() {
        subjectsContainer.style.display = 'none';
        questionContainer.style.display = 'block';

        const question = questions[currentSubject][currentQuestionIndex];
        questionText.innerText = question.text;
        questionImage.src = question.image;
        resultMessage.innerText = "";
        repeatAnswerButton.style.display = 'none';
        showAnswerButton.style.display = 'none';
        playAudioButton.style.display = 'none';
        stopRecordButton.style.display = 'none';
        recordButton.style.display = 'inline-block';
    }

    // تسجيل الإجابة
    recordButton.addEventListener('click', () => {
        resultMessage.innerText = "جارٍ تسجيل الإجابة...";
        resultMessage.style.color = "#3498db";
        recordButton.style.display = 'none';
        stopRecordButton.style.display = 'inline-block';

        // إذا كان لدينا إذن مسبقًا، نستخدمه مباشرة
        if (mediaStream) {
            startRecording(mediaStream);
        } else {
            // إذا لم يكن لدينا إذن، نطلبه
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    mediaStream = stream; // حفظ تيار الصوت
                    startRecording(stream);
                })
                .catch(err => {
                    console.error("خطأ في الوصول إلى الميكروفون:", err);
                    resultMessage.innerText = "خطأ في الوصول إلى الميكروفون. يرجى التأكد من منح الإذن.";
                    resultMessage.style.color = "#e74c3c";
                    recordButton.style.display = 'inline-block';
                    stopRecordButton.style.display = 'none';
                });
        }
    });

    // بدء التسجيل
    function startRecording(stream) {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks);
            audioUrl = URL.createObjectURL(audioBlob);

            // تحويل الصوت إلى نص باستخدام Web Speech API
            convertSpeechToText(audioBlob)
                .then(text => {
                    recordedAnswer = text;
                    resultMessage.innerText = `تم تسجيل الإجابة: ${text}`;
                    resultMessage.style.color = "#2ecc71";
                    checkAnswer(text); // فحص الإجابة
                })
                .catch(err => {
                    console.error("خطأ في تحويل الصوت إلى نص:", err);
                    resultMessage.innerText = "خطأ في تحويل الصوت إلى نص. يرجى المحاولة مرة أخرى.";
                    resultMessage.style.color = "#e74c3c";
                });

            // إظهار الأزرار بعد انتهاء التسجيل
            playAudioButton.style.display = 'inline-block';
            repeatAnswerButton.style.display = 'inline-block';
            showAnswerButton.style.display = 'inline-block';
        });

        // إيقاف التسجيل بعد 5 ثوانٍ (يمكن تعديل المدة)
        setTimeout(() => {
            mediaRecorder.stop();
        }, 5000); // التسجيل يتوقف بعد 5 ثوانٍ
    }

    // إيقاف التسجيل يدويًا
    stopRecordButton.addEventListener('click', () => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            stopRecordButton.style.display = 'none';
            recordButton.style.display = 'inline-block';
        }
    });

    // تشغيل الصوت المسجل
    playAudioButton.addEventListener('click', () => {
        const currentTime = Date.now();
        if (currentTime - lastClickTime < clickDelay) {
            resultMessage.innerText = "ممنوع الضغط بشكل متكرر. انتظر قليلاً.";
            resultMessage.style.color = "#e74c3c";
            return;
        }
        lastClickTime = currentTime;

        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        } else {
            console.error("لا يوجد صوت مسجل.");
            resultMessage.innerText = "لا يوجد صوت مسجل.";
            resultMessage.style.color = "#e74c3c";
        }
    });

    // إعادة نطق الإجابة الصحيحة
    repeatAnswerButton.addEventListener('click', () => {
        const currentTime = Date.now();
        if (currentTime - lastClickTime < clickDelay) {
            resultMessage.innerText = "ممنوع الضغط بشكل متكرر. انتظر قليلاً.";
            resultMessage.style.color = "#e74c3c";
            return;
        }
        lastClickTime = currentTime;

        const correctAnswer = removeTaaMarbuta(questions[currentSubject][currentQuestionIndex].answer);
        repeatAnswer(correctAnswer);
    });

    // تحويل الصوت إلى نص باستخدام Web Speech API
    function convertSpeechToText(audioBlob) {
        return new Promise((resolve, reject) => {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'ar-SA'; // اللغة العربية (السعودية)
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                console.log("النص المعترف عليه:", transcript);
                resolve(removeTaaMarbuta(transcript)); // إزالة التاء المربوطة
            };

            recognition.onerror = (event) => {
                console.error("حدث خطأ في التعرف على الكلام:", event.error);
                reject(event.error);
            };

            // تشغيل التعرف على الكلام
            recognition.start();

            // إيقاف التعرف بعد 5 ثوانٍ (اختياري)
            setTimeout(() => {
                recognition.stop();
            }, 5000);
        });
    }

    // إزالة التاء المربوطة من النص
    function removeTaaMarbuta(text) {
        return text.replace(/ة/g, 'ه'); // استبدال التاء المربوطة بهاء
    }

    // التحقق من صحة الإجابة
    function checkAnswer(answer) {
        const correctAnswer = removeTaaMarbuta(questions[currentSubject][currentQuestionIndex].answer);
        if (answer.trim() === correctAnswer) {
            resultMessage.innerText = "إجابة صحيحة!";
            resultMessage.style.color = "#2ecc71";
        } else {
            resultMessage.innerText = "إجابة خاطئة. حاول مرة أخرى.";
            resultMessage.style.color = "#e74c3c";
        }

        // إعادة نطق الإجابة الصحيحة
        repeatAnswer(correctAnswer);
    }

    // إعادة نطق الإجابة الصحيحة
    function repeatAnswer(correctAnswer) {
        const utterance = new SpeechSynthesisUtterance(`الإجابة الصحيحة هي: ${correctAnswer}`);
        utterance.lang = 'ar-SA';
        speechSynthesis.speak(utterance);
    }

    // عرض الإجابة الصحيحة
    showAnswerButton.addEventListener('click', () => {
        const correctAnswer = removeTaaMarbuta(questions[currentSubject][currentQuestionIndex].answer);
        resultMessage.innerText = `الإجابة الصحيحة هي: ${correctAnswer}`;
        resultMessage.style.color = "#2ecc71";
        repeatAnswer(correctAnswer); // إعادة نطق الإجابة الصحيحة
    });
});