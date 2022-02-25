var objidservices = ["asImage",
    "associations",
    "inactivate",
    "maintain",
    "mediaAttributes",
    "mediaContent",
    "thumbnail",
    "xmlToHTML",
    "styleSheet",
    "styleSheetContent"
]

var camm_options = `<option value="asImage">/asimage/{identifier}</option>
<option value="associations">/associations/{identifier}</option>
<option value="contentTypes">/contentTypes</option>
<option value="group">/group/{groupIdentifier}</option>
<option value="inactivate">/inactivate/{identifier}</option>
<option value="initialize">/{contentType}/initialize</option>
<option value="maintain">/maintain/{identifier}</option>
<option value="media">/media</option>
<option value="mediaAttributes">/mediaAttributes/{identifier}</option>
<option value="mediaContent">/mediaContent/{identifier}</option>
<option value="personPhoto">/{personId}/personPhoto</option>
<option value="publish">/publish</option>
<option value="store">/{contentType}/store</option>
<option value="storeMP">/{contentType}/storeMP</option>
<option value="thumbnail">/thumbnail/{identifier}</option>
<option value="xmlToHTML">/xmlToHTML/{identifier}</option>
<option value="styleSheet">/styleSheet/{identifier}</option>
<option value="styleSheetContent">/styleSheetContent/{identifier}</option>
<option value="tagMedia">/tagMedia</option>
<option value="health">/meta/health</option>
<option value="version">/meta/version</option>`;

var study_val_options = `<option value="studyNotification">/studyNotification</option>
<option value="procedure-requests">/procedure-requests</option>`;


var username = 'powerchart@solgm';
var password = 'powerchart';
var url = "";
var full_url = "";
var services = "";
var service = "";
var objid = "";
var parameters = "";
var count = 0;
$('#submit').on("click", function () {
    $('#iframe').hide();
    $('#fullurl').html("");
    service = $('#service option:selected').val();
    services = $('#services option:selected').val();
    url = $('#url').val();
    url = url.replace('[services]', services);
    slashservice = 'service/';
    if (url.substr(-8) == 'service/') url = url.slice(0, -8);
    if (url.substr(-1) != '/') url += '/';
    full_url = url;
    objid = $('#identifier').val();
    objid = objid.replace('{', '%7B');
    objid = objid.replace('}', '%7D');
    switch (service) {
        case "asImage":
            full_url += slashservice + service + '/' + objid;
            getCriteria();
            getImages(full_url);
            break;
        case "associations":
            full_url += slashservice + service + '/' + objid;
            getCriteria();
            getData(full_url);
            break;
        case "contentTypes":
            full_url += slashservice + service;
            getCriteria();
            getData(full_url);
            break;
        case "group":
            full_url += slashservice + service + '/' + $('#groupId').val();
            getCriteria();
            getData(full_url);
            break;
        case "inactivate":
            full_url += slashservice + service + '/' + objid;
            getCriteria();
            getData(full_url);
            break;
        case "initialize":
            full_url += $('#contentType').val() + '/' + slashservice + service;
            getCriteria();
            getData(full_url);
            break;
        case "maintain":
            full_url += slashservice + service;
            getCriteria();
            getData(full_url);
            break;
        case "media":
            full_url += slashservice + service + objid;
            getCriteria();
            getData(full_url);
            break;
        case "mediaAttributes":
            full_url += slashservice + service + '/' + objid;
            getCriteria();
            getData(full_url);
            break;
        case "mediaContent":
            full_url += slashservice + service + '/' + objid;
            getCriteria();
            getImages(full_url);
            break;
        case "personPhoto":
            getCriteria();
            full_url += $('#personId').val() + '/' + slashservice + service;
            break;
        case "publish":
            full_url += slashservice + service;
            getData(full_url);
        case "store":
            full_url += $('#contentType').val() + '/' + slashservice + service;
            getCriteria();
            getData(full_url);
            break;
        case "storeMP":
            full_url += $('#contentType').val() + '/' + slashservice + service;
            getCriteria();
            getData(full_url);
            break;
        case "thumbnail":
            full_url += slashservice + service + '/' + objid;
            getCriteria();
            getImages(full_url);
            break;
        case "xmlToHTML":
            full_url += slashservice + service + '/' + objid;
            getCriteria();
            getData(full_url);
            break;
        case "styleSheet":
            full_url += slashservice + service + '/' + objid;
            getCriteria();
            getData(full_url);
            break;
        case "styleSheetContent":
            full_url += slashservice + service + '/' + objid;
            getCriteria();
            getData(full_url);
            break;
        case "tagMedia":
            full_url += slashservice + service;
            getCriteria();
            getData(full_url);
            break;
        case "health":
            full_url += 'meta/' + service;
            getCriteria();
            getData(full_url);
            break;
        case "version":
            full_url += 'meta/' + service;
            getCriteria();
            getData(full_url);
            break;
    }

});

$('#service option').on("click", function () {
    $('.addl').hide();
    $('.additional_fields input').val("");
    $('h3').text($(this).val());
    if (objidservices.indexOf($(this).val()) != -1) {
        $('.obj_id').show();
    }
    let service = $(this).val();
    $('.' + service).show();
});

$('#services option').on("click", function () {
    $('#service').html("");
    $('.addl').hide();
    $('.additional_fields input').val("");
    switch ($(this).val()) {
        case "camm":
            $('#service').html(camm_options);
            break;
        case "studyvalidation":
            $('#service').html(study_val_options);
            break;
        default:
            $('#service').html("");
            break;
    }
});

function getFields(section) {
    var fieldArray = {};
    $('.' + section + 'field').each(function () {
        if ($(this).val() && $(this).val() != "") {
            if ($(this).is(':checkbox')) {
                var field = $(this).prop("checked") ? 1 : 0;
            } else if ($(this).is('[type="date"]')) {
                field = Date.parse($(this).val());
                field = field.slice(0, 9);
                console.log('date');
            } else { field = $(this).val(); }
            fieldArray[$(this).attr('id')] = field;
            //console.log("id: " + $(this).attr('id') + " val: " + $(this).val());
        }
    });
    return fieldArray;
}

function getData(x) {
    $('#resultbox').empty().show();
    datain = {};
    datain['full_url'] = x;
    datain['username'] = username;
    datain['password'] = password;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../queries/index.php",
        data: datain,
        complete: function (data) {
            console.log(data);
            try {
                // if (data.responseJSON.length > 0) {
                $('#resultbox').empty().simpleJson({
                    jsonObject: data.responseJSON
                });
                // }
            } catch (err) { $('#resultbox').html(err); }
        }
    });
}

function getImages(x) {
    $('#resultbox').empty().hide();
    $('#iframe').show();
    $('#iframe').empty().attr("src", x);
}

function getCriteria() {
    var getfields = getFields(service);
    parameters = "";
    count = 0;
    for (const [i, v] of Object.entries(getfields)) {
        if (count > 0) { parameters += "&"; }
        parameters += i + "=" + v;
        count++;
    }
    full_url += '?' + parameters;
    $('#fullurl').html(full_url);
}