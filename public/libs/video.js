jQuery(document).ready(function() {  

    var recordRTC = null;
    var mediaConstraints = { video: true, audio: true };
    var video = $('#videoPlayer'); //document.getElementById('videoPlayer');
    var btnStartRecording = $('#startRecordingBtn');
    var btnStopRecording = $('#stopRecordingBtn');
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
            subtitles.push("test");
            recordRTC.startRecording();
        }
    };

    var stopRecording = function () {
        
        if(recordRTC == null) {
            console.log("Recording is not started");
            alert("Първо трябва да започнете записването!");
        }
        subtitles.push("test2");

        recordRTC.stopRecording(function(videoURL) {
            video.attr('src',videoURL);
            video.show();

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