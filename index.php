<?php
include 'includes/header.php';
$_SESSION['currentpage'] = "home";
?>
<link rel="stylesheet" href="json-collapsible-tree/css/simpleJson.css" />
<script src="json-collapsible-tree/js/simpleJson.js"></script>

<!DOCTYPE html>
<title>CAMM Core</title>
<style>
    * {
        font-family: Arial, Helvetica, sans-serif;
    }

    h1{
        text-align: center;
        margin: 0;
    }

    h2 {
        text-align: center;
        background-color: rgb(0, 102, 52);
        border-bottom: 1pt solid gray;
        color: white;
        margin: 0;
    }

    .mainpage {
        display: grid;
        grid-template-columns: 25% 75%;
        padding: 2em;
        gap: 1em;
        justify-content: center;
    }

    #resultbox {
        word-break: break-word;
    }

    .addl {
        display: none;
    }

    .frame {
        display: none;
        width: 100%;
        height: 70vh;
        border: none;
    }

    .box {
        border: 3pt solid rgb(0, 102, 52);
    }
</style>
</head>

<body>
    <h1>CAMM Core Service Testing</h1>
    <?php include 'includes/dbconnect.php'; ?>
    <div class="mainpage">
        <div class="box">
            <h2>Service Details</h2>
            <div><label>Domain</label></div>
            <select size=2 id="url">
                <option value="http://ip85wodr12a.ip.devcerner.net/[services]/solgm.ip.devcerner.net/service/">Solgm</option>
                <option value="http://ip85lintodr01.ip.devcerner.net:8080/[services]/intgm.ip.devcerner.net/service/">Intgm</option>
            </select>
            <div><label>Services</label></div>
            <select size=2 id="services">
                <option value="camm">CAMM</option>
                <option value="studyvalidation">Study Validation</option>
            </select>
            <div><label>Select a Service</label></div>
            <select id="service" size=10>
            </select>
            <h2 style="margin-top: 30px;">Additional fields</h2>
            <div class="additional_fields" style="margin-bottom: 30px;">
                <div class="addl obj_id"><label>Object Identifier</label><input class="" type="text" id="identifier"></div>
                <div class="addl media">
                    <div class="addl media"><label>Person ID</label><input class="mediafield" type="text" id="personId"></div>
                    <div class="addl media"><label>Encounter ID</label><input class="mediafield" type="text" id="encounterId"></div>
                    <div class="addl media"><label>Entity Name</label><input class="mediafield" type="text" id="entityName"></div>
                    <div class="addl media"><label>Content type</label><input class="mediafield" type="text" id="contentType"></div>
                    <div class="addl media"><label>Begin Date</label><input class="mediafield" type="date" id="beginDate"></div>
                    <div class="addl media"><label>End Date</label><input class="mediafield" type="date" id="endDate"></div>
                    <div class="addl media"><label>Include Children</label><input class="mediafield" type="checkbox" id="includeChildren"></div>
                    <div class="addl media"><label>Include Related Doc Info</label><input class="mediafield" type="checkbox" id="includeRelatedDocinfo"></div>
                    <div class="addl media"><label>Include Tag Info</label><input class="mediafield" type="checkbox" id="includeTagInfo"></div>
                </div>
                <div class="addl asimage">
                    <div class="addl asimage"><label>Identifier Type</label><input class="asimagefield" type="text" id="identifierType"></div>
                    <div class="addl asimage"><label>Version</label><input class="asimagefield" type="text" id="version"></div>
                    <div class="addl asimage"><label>Height</label><input class="asimagefield" type="text" id="height"></div>
                    <div class="addl asimage"><label>Width</label><input class="asimagefield" type="date" id="width"></div>
                    <div class="addl asimage"><label>Quality</label><input class="asimagefield" type="date" id="quality"></div>
                    <div class="addl asimage"><label>Frame</label><input class="asimagefield" type="checkbox" id="frame"></div>
                </div>
                <button style="float: right;" id="submit">Submit</button>
            </div>
        </div>
        <div class="box">
            <h2>Results</h2>
            <div id="fullurl" style="word-break: break-word; font-size: 9pt;"></div>
            <div id="resultbox"></div>
            <iframe id="iframe" class="frame" title="Inline Frame Example" src="">
            </iframe>
        </div>
    </div>
</body>
<script type="text/javascript" src="../js/index.js"></script>