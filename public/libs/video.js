jQuery(document).ready(function() {  

    var recordRTC = null;
    var mediaConstraints = { video: true, audio: true };
    var video = $('#videoPlayer'); //document.getElementById('videoPlayer');
    var btnStartRecording = $('#startRecordingBtn');
    var btnStopRecording = $('#stopRecordingBtn');
    var btnStart2 = $('#startButtonInterview');
    var subtitles = new Array();

    video.hide();

    btnStopRecording.click(function () {
        stopRecording();
        return false;
    });


    btnStartRecording.click(function () {
        startRecording();
        return false;
    });
    btnStart2.click(function () {
        startRecording();
    });




    var successCallback = function (stream) {
        console.log("Success");
        // RecordRTC usage goes here

        var options = {
          mimeType: 'video/webm', // or video/mp4 or audio/ogg
          audioBitsPerSecond: 128000,
          videoBitsPerSecond: 128000,
          bitsPerSecond: 128000 // if this line is provided, skip above two
        };
        recordRTC = RecordRTC(stream, options);

    };

    var errorCallback = function (error) {
        console.log(error);
        // maybe another application is using the device
    };

    var startRecording = function () {
        if(recordRTC == null) {
            console.log("recordRTC Not initialized");
        } else {
            subtitles = new Array();
            recordRTC.startRecording();
            showNextQuestion();
               
        }


    };

    var name = '';
    var questions1 = new Array(
        'Може ли да ми кажете нещо повече за себе си?',
        'С какво сте се занимавали досега?',
        'Как стигнахте до тук?');
    var questions2 = new Array(
        'Ще ми разкажете ли повече за вашите качества и знания?',
        'Защо мислите, че сте подходящи за тази позиция?',
        'Какви са Вашите силни страни?');
    var questions3 = new Array('Каква е разликата между int и Integer?',
        'Какво е полиморфизъм и за какво може да го използваш?',
        'Какво знаеш за транзакциите в базите данни?');
    var questions5 = 'Имате ли някакви въпроси?';
    var questions = new Array(
        questions1[Math.floor(Math.random()*questions1.length)],
        questions2[Math.floor(Math.random()*questions2.length)],
        questions3[Math.floor(Math.random()*questions3.length)],
        questions5);
    var iter = 0;
    var showNextQuestion = function() {
        if(questions.length <= iter) {
            stopRecording();

            iter = 0;   
        }
        showQuestion(questions[iter++]);
        $('.countdown').html('').ClassyCountdown({
            theme: "flat-colors-very-wide",
            end: $.now() + 60,
            onEndCallback: function(){
                showNextQuestion();
            }
        });
    };

    var showQuestion = function (question) {
        $('.qtext > p').html(question+"<br /><br />");
        subtitles.push(question);
    };

    var stopRecording = function () {
        
        if(recordRTC == null) {
            console.log("Recording is not started");
            alert("Първо трябва да започнете записването!");
        }

        recordRTC.stopRecording(function(videoURL) {
            //video.attr('src',videoURL);
            //video.show();
            $('.progressWrapper').show();

            var recordedBlob = recordRTC.getBlob();
            recordRTC.getDataURL(function(dataURL) {
                var fileType = 'video'; // or "audio"
                var date = new Date();
                var fileName = date.getTime() + '.webm';  // or "wav"

                var formData = new FormData();
                formData.append(fileType + '-filename', fileName);
                formData.append(fileType + '-blob', recordedBlob);
                formData.append(fileType + '-subtitles', JSON.stringify(subtitles));

                xhr('records/ajax', formData, function (fName) {
                    console.log(fName);
                    var file = JSON.parse(fName);
                    if(file.subtitles != '') {
                        var text2 = '<track label="Въпроси" kind="subtitles" srclang="bg" src="'+file.subtitles+'" default>';
                        video.html(text2);
                    }
                    $('.progressWrapper').hide();
                    $('.interviewwindow').hide();
                    video.show();
                    video.attr('src',file.video);
                    window.open(location.href + fName);
                });
             });
        });
    };


    function xhr(url, data, callback) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4 && request.status == 200) {
                callback(request.responseText);
            }
        };
        request.open('POST', url);
        request.send(data);
    }

    navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);


    var sampleQuestions = {
        basic : [
            {
                question:   "Разкажете ми повече за себе си",
                answers: [
                    'Като бях малък родителите ми много се грижиха за мен и станах много добър във всичко...',
                    'Обичам да пазарувам и да се разхождам с приятели...',
                    'От една година съм в тази сфера на работа и мисля, че съм запознат с основните понятия...'
                ],
                correct: 2,
                description: "Когато ви зададът този въпрос обикновенно работодателя иска да разбере нещо свързано с конкретната позиция, както и как сте придобили знанията си. Затова не е добре да разказвате далечни случки от времето когато сте били малки или да отговаряте по груб начин. "


            },

        ],
        technical : [],


    };
});