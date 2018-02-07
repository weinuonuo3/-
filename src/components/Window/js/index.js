export default {
    ArcgisUrl: "http://218.1.67.12/arcgisadaptor/rest/services/psc_psss_wcg84_20160412/MapServer/",
    Get_Url: function(num, where) {
        var url = this.ArcgisUrl + num + "/query?returnGeometry=false&spatialRel=esriSpatialRelIntersects&where=" + where + "&outFields=*&f=json";
        return url;
    },
    Get_Img_Url: function(OBJECTID) {
        var url = this.ArcgisUrl + "7/" + OBJECTID + "/attachments?f=pjson";
        return url;
    },
    GetData: function(_url, fun) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: _url,
            success: function(data) {
                fun(data);
            },
            error: function(err) {}
        });
    }
}