document.addEventListener('DOMContentLoaded', () => {
    // عناصر الواجهة
    const questionText = document.getElementById('question-text');
    const recordButton = document.getElementById('record-answer');
    const stopRecordButton = document.getElementById('stop-record');
    const playAudioButton = document.getElementById('play-audio');
    const repeatAnswerButton = document.getElementById('repeat-answer');
    const showAnswerButton = document.getElementById('show-answer');
    const resultMessage = document.getElementById('result-message');
    const feedbackElement = document.getElementById("feedback");
    const audioPlayback = document.getElementById("audio-playback");

    // بيانات الأسئلة
const questions = {
    math: [
        { text: "ما هو ناتج 5 + 3؟", answer: "8" },
        { text: "ما هو ناتج 2 * 5؟", answer: "10" },
        { text: "ما هو ناتج 10 - 4؟", answer: "6" },
        { text: "ما هو ناتج 15 / 3؟", answer: "5" },
        { text: "ما هو ناتج 7 + 8؟", answer: "15" },
        { text: "ما هو ناتج 6 * 7؟", answer: "42" },
        { text: "ما هو ناتج 20 - 9؟", answer: "11" },
        { text: "ما هو ناتج 18 / 2؟", answer: "9" },
        { text: "ما هو ناتج 3 + 4 * 2؟", answer: "11" },
        { text: "ما هو ناتج (5 + 3) * 2؟", answer: "16" },
        { text: "ما هو ناتج 10 / 2 + 3؟", answer: "8" },
        { text: "ما هو ناتج 12 - (4 + 3)?", answer: "5" },
        { text: "ما هو ناتج 5 * (3 + 2)?", answer: "25" },
        { text: "ما هو ناتج 20 / (4 + 1)?", answer: "4" },
        { text: "ما هو ناتج 7 + 3 * 2؟", answer: "13" },
        { text: "ما هو ناتج (8 - 3) * 2؟", answer: "10" },
        { text: "ما هو ناتج 15 / (5 - 2)?", answer: "5" },
        { text: "ما هو ناتج 9 + 6 / 2؟", answer: "12" },
        { text: "ما هو ناتج (10 + 2) / 3؟", answer: "4" },
        { text: "ما هو ناتج 4 * 3 + 2؟", answer: "14" },
        { text: "ما هو ناتج 5 + س = 10، فما قيمة س؟", answer: "5" },
        { text: "ما هو ناتج 3 * س = 15، فما قيمة س؟", answer: "5" },
        { text: "ما هو ناتج 20 - س = 12، فما قيمة س؟", answer: "8" },
        { text: "ما هو ناتج س / 4 = 3، فما قيمة س؟", answer: "12" },
        { text: "ما هو ناتج 2 * س + 3 = 11، فما قيمة س؟", answer: "4" },
        { text: "ما هو ناتج 5 + س * 2 = 15، فما قيمة س؟", answer: "5" },
        { text: "ما هو ناتج (س + 3) * 2 = 16، فما قيمة س؟", answer: "5" },
        { text: "ما هو ناتج 10 / س = 2، فما قيمة س؟", answer: "5" },
        { text: "ما هو ناتج 3 * س - 2 = 10، فما قيمة س؟", answer: "4" },
        { text: "ما هو ناتج 2 * (س + 3) = 14، فما قيمة س؟", answer: "4" }
    ],
    science: [
        { text: "ما هو اكبر كوكب في المجموعه الشمسيه؟", answer: "المشتري" },
        { text: "ما هو العنصر الكيميائي الذي يرمز له بالرمز O؟", answer: "الاوكسجين" },
        { text: "اي من الاطعمه يحتوي على فيتامين C بشكل اساسي؟", answer: "البرتقال" },
        { text: "ما هو الغاز المسؤول عن تنفس الكائنات الحيه؟", answer: "الاوكسجين" },
        { text: "ما هي الوحده المستخدمه لقياس درجه الحراره؟", answer: "الدرجه المئويه" },
        { text: "كم عدد خلايا الدم الحمراء في الجسم البشري؟", answer: "مليارات" },
        { text: "ماذا يسمى الجزيء الذي يحتوي على كربون؟", answer: "مركب عضوي" },
        { text: "ما هي عمليه تحويل الضوء الى طاقه كيميائيه في النباتات؟", answer: "التمثيل الضوئي" },
        { text: "اي من الغازات يسبب الاحتباس الحراري؟", answer: "ثاني اكسيد الكربون" },
        { text: "ماذا يحدث عندما يتم تسخين ماده؟", answer: "تتمدد" },
        { text: "ما هي الوحده الاساسيه لقياس الكتله؟", answer: "الكيلوغرام" },
        { text: "ما هو الغاز الذي يطلقه الانسان عند التنفس؟", answer: "ثاني اكسيد الكربون" },
        { text: "اي من الحيوانات يتغذى على النباتات؟", answer: "العاشب" },
        { text: "ما هو العنصر الذي يشكل معظم قشره الارض؟", answer: "السيليكون" },
        { text: "ماذا يحدث عندما يتم خلط الماء مع الملح؟", answer: "يذوب الملح في الماء" },
        { text: "ما هو العنصر الكيميائي الذي يرمز له بالرمز H؟", answer: "الهيدروجين" },
        { text: "ماذا تسمى العمليه التي تتحول فيها الماده من الحاله السائله الى الحاله الغازيه؟", answer: "التبخر" },
        { text: "اي من الغازات يشكل معظم الغلاف الجوي؟", answer: "النيتروجين" },
        { text: "ما هي ماده حيويه تحتوي على الكربون والهيدروجين؟", answer: "البروتين" },
        { text: "ما هو اصل المياه التي نشربها؟", answer: "الامطار" },
        { text: "اي من النباتات يعتمد على الفوتوسنتيس؟", answer: "الاشجار" },
        { text: "ما هي الطاقه التي تستمدها النباتات من الشمس؟", answer: "طاقه ضوئيه" },
        { text: "اي من الحيوانات يتغذى على اللحوم؟", answer: "اللاحم" },
        { text: "ماذا تسمى العمليه التي يتحول فيها الغاز الى سائل؟", answer: "التكاثف" },
        { text: "ما هي الماده التي تصنع منها جدران الخلايا في النباتات؟", answer: "السليلوز" },
        { text: "ماذا يسمى تحول الماده من الحاله الصلبه الى الحاله السائله؟", answer: "الانصهار" },
        { text: "اي من الغازات يشكل غلاف الارض الجوي؟", answer: "الاوكسجين" },
        { text: "ماذا يسمى الجزء الصلب في النباتات الذي يسحب المياه؟", answer: "الجذور" },
        { text: "ما هو اصل الطاقه الشمسيه؟", answer: "الشمس" },
        { text: "ما هي الغازات التي تكون هي المسؤوله عن الاوكسجين في الكائنات الحيه؟", answer: "الاوكسجين والهيدروجين" }
    ],
    arabic: [
        { text: "ما هو جمع كلمه كتاب؟", answer: "كتب" },
        { text: "ما هو ضد كلمه سعيد؟", answer: "حزين" },
        { text: "ما هو جمع كلمه طالب؟", answer: "طلاب" },
        { text: "ما هو ضد كلمه كبير؟", answer: "صغير" },
        { text: "ما معنى كلمه قلم؟", answer: "اداه تستخدم للكتابه" },
        { text: "ما جمع كلمه كتاب؟", answer: "كتب" },
        { text: "استخدم كلمه سماء في جمله.", answer: "السماء جميله في الصباح" },
        { text: "ما هو عكس كلمه طويل؟", answer: "قصير" },
        { text: "ما هو جمع كلمه شجره؟", answer: "اشجار" },
        { text: "ماذا تعني كلمه ماء؟", answer: "سائل شفاف لا طعم له، نستخدمه للشرب" },
        { text: "ما معنى سريع؟", answer: "سريع تعني ان الشخص او الشيء يتحرك بسرعه" },
        { text: "اكمل الجمله: الطلاب في ______", answer: "الفصل" },
        { text: "ما هو جمع كلمه قلب؟", answer: "قلوب" },
        { text: "استخدم كلمه بيت في جمله.", answer: "نحن نعيش في بيت كبير" },
        { text: "ما هو معنى مروءه؟", answer: "المروءه هي العزه والكرم" },
        { text: "ماذا تعني كلمه فخر؟", answer: "الفخر هو شعور بالاعتزاز بشيء جيد او شخص عزيز" },
        { text: "استخدم كلمه حلم في جمله.", answer: "حلمت بانني اسافر حول العالم" },
        { text: "ما هو جمع كلمه صديق؟", answer: "اصدقاء" },
        { text: "ما هو عكس كلمه جميل؟", answer: "قبيح" },
        { text: "اكمل الجمله: الطائر ______ في السماء.", answer: "يطير" },
        { text: "استخدم كلمه سعاده في جمله.", answer: "سعادتي كانت كبيره عندما فزت بالمسابقه" },
        { text: "ماذا تعني كلمه شجاعه؟", answer: "الشجاعه هي القدره على مواجهه الخوف" },
        { text: "ما هو جمع كلمه مدينه؟", answer: "مدن" },
        { text: "اكمل الجمله: اريد ان اذهب الى ______", answer: "المدرسه" },
        { text: "ماذا تعني كلمه الاستقامه؟", answer: "الاستقامه تعني ان تكون صادقًا وتتصرف بشكل صحيح" },
        { text: "ما معنى كلمه التضحيه؟", answer: "التضحيه تعني ان تقدم شيئًا ثمينًا لاجل الآخرين" },
        { text: "استخدم كلمه كرم في جمله.", answer: "هو شخص معروف بكرمه مع الجميع" },
        { text: "ما جمع كلمه شجره؟", answer: "اشجار" },
        { text: "اكمل الجمله: الطفل _____ في الحديقه.", answer: "يلعب" },
        { text: "ما معنى النظام؟", answer: "النظام هو ترتيب الاشياء بشكل منظم ومرتب" }
    ]
};
    let currentSubject = null;
    let currentQuestionIndex = 0;
    let recordedAnswer = "";
    let mediaRecorder;
    let audioChunks = [];
    let audioUrl = null;
    let isRecording = false;
    let stream;
    let recognition;

    // بدء التسجيل والتحليل
    async function startRecordingAndAnalysis(correctWord) {
        console.log("بدء التسجيل...");
        try {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            audioChunks = [];

            console.log("جاري طلب إذن استخدام الميكروفون...");
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log("تم منح الإذن بنجاح!");

            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                audioUrl = URL.createObjectURL(audioBlob);
                audioPlayback.src = audioUrl;
                audioPlayback.classList.remove("hidden");
            };

            mediaRecorder.start();

            recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = "ar-SA";
            recognition.interimResults = false;
            recognition.maxAlternatives = 3;
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onresult = (event) => {
                const spokenText = event.results[0][0].transcript;
                console.log("النطق المسجل:", spokenText);

                if (isPronunciationCorrect(spokenText, correctWord)) {
                    resultMessage.innerText = "إجابة صحيحة!";
                    resultMessage.style.color = "#2ecc71";
                } else {
                    resultMessage.innerText = "إجابة خاطئة. حاول مرة أخرى.";
                    resultMessage.style.color = "#e74c3c";
                }

                stopRecording();
            };

            recognition.onerror = (event) => {
                console.error("خطأ في التعرف على الكلام:", event.error);
                resultMessage.innerText = "حدث خطأ أثناء التحليل!";
            };

            recognition.onend = () => {
                console.log("انتهى التعرف على الكلام.");
            };

            recognition.start();

        } catch (error) {
            console.error("خطأ في التسجيل:", error);
            if (error.name === "NotAllowedError") {
                resultMessage.innerText = "يجب السماح بالوصول إلى الميكروفون!";
            } else if (error.name === "NotFoundError") {
                resultMessage.innerText = "الميكروفون غير متصل!";
            } else {
                resultMessage.innerText = "حدث خطأ غير متوقع!";
            }
        }
    }

    // إيقاف التسجيل
    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state === "recording") {
            mediaRecorder.stop();
            recognition.stop();
            isRecording = false;
            console.log("تم إيقاف التسجيل!");

            // إظهار الأزرار بعد إيقاف التسجيل
            playAudioButton.style.display = 'inline-block';
            repeatAnswerButton.style.display = 'inline-block';
            showAnswerButton.style.display = 'inline-block';
            stopRecordButton.style.display = 'none';
            recordButton.style.display = 'inline-block'; // إعادة عرض زر تسجيل الإجابة
        }
    }

    // التحقق من صحة النطق
    function isPronunciationCorrect(spokenText, correctText) {
        const cleanedSpokenText = removeTashkeel(spokenText).trim();
        const cleanedCorrectText = removeTashkeel(correctText).trim();

        if (cleanedCorrectText.length <= 3) {
            return cleanedSpokenText === cleanedCorrectText;
        }

        let correctChars = 0;
        const minLength = Math.min(cleanedSpokenText.length, cleanedCorrectText.length);

        for (let i = 0; i < minLength; i++) {
            if (cleanedSpokenText[i] === cleanedCorrectText[i]) {
                correctChars++;
            }
        }

        const accuracy = (correctChars / cleanedCorrectText.length) * 100;
        return accuracy >= 80;
    }

    // إزالة التشكيل من النص
    function removeTashkeel(text) {
        return text.replace(/[\u064B-\u065F\u0610-\u061A]/g, '');
    }

    // إزالة التاء المربوطة من النص
    function removeTaaMarbuta(text) {
        return text.replace(/ة/g, 'ه');
    }

    // إعادة نطق الإجابة الصحيحة
    function repeatAnswer(correctAnswer) {
        const utterance = new SpeechSynthesisUtterance(`الإجابة الصحيحة هي: ${correctAnswer}`);
        utterance.lang = 'ar-SA';
        speechSynthesis.speak(utterance);
    }

    // عرض سؤال عشوائي
    function showRandomQuestion() {
        if (!questions[currentSubject]) {
            console.error("المادة غير معرّفة:", currentSubject);
            return;
        }

        // اختيار سؤال عشوائي
        currentQuestionIndex = Math.floor(Math.random() * questions[currentSubject].length);
        const question = questions[currentSubject][currentQuestionIndex];

        // عرض السؤال
        questionText.innerText = question.text;
        resultMessage.innerText = "";
        repeatAnswerButton.style.display = 'none';
        showAnswerButton.style.display = 'none';
        playAudioButton.style.display = 'none';
        stopRecordButton.style.display = 'none';
        recordButton.style.display = 'inline-block';
    }

    // تسجيل الإجابة
    recordButton.addEventListener('click', async () => {
        if (!questions[currentSubject] || !questions[currentSubject][currentQuestionIndex]) {
            console.error("السؤال غير معرّف:", currentSubject, currentQuestionIndex);
            resultMessage.innerText = "السؤال غير معرّف!";
            resultMessage.style.color = "#e74c3c";
            return;
        }

        await startRecordingAndAnalysis(questions[currentSubject][currentQuestionIndex].answer);

        // تبديل الأزرار
        recordButton.style.display = 'none';
        stopRecordButton.style.display = 'inline-block';
    });

    // إيقاف التسجيل يدويًا
    stopRecordButton.addEventListener('click', () => {
        stopRecording();
    });

    // تشغيل الصوت المسجل
    playAudioButton.addEventListener('click', () => {
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
        const correctAnswer = removeTaaMarbuta(questions[currentSubject][currentQuestionIndex].answer);
        repeatAnswer(correctAnswer);
    });

    // عرض الإجابة الصحيحة
    showAnswerButton.addEventListener('click', () => {
        const correctAnswer = removeTaaMarbuta(questions[currentSubject][currentQuestionIndex].answer);
        resultMessage.innerText = `الإجابة الصحيحة هي: ${correctAnswer}`;
        resultMessage.style.color = "#2ecc71";
    });

    // بدء التحدي
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    const level = urlParams.get('level');

    if (!subject || !questions[subject]) {
        console.error("المادة غير معرّفة أو غير موجودة:", subject);
        alert("المادة غير معرّفة أو غير موجودة!");
        window.location.href = "index.html"; // إعادة التوجيه إلى الصفحة الرئيسية
        return; // إيقاف تنفيذ الكود
    }

    currentSubject = subject;
    showRandomQuestion();

    // ربط زر تجديد السؤال بالوظيفة
    document.getElementById('refresh-question').addEventListener('click', () => {
        showRandomQuestion();
    });
});