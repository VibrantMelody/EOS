var tineye = tineye || {};
var apiNamespace = window.chrome || window.browser;

tineye.SERVER = "tineye.com";
tineye.VERSION = "1.5.1";
tineye.BROWSER = "chrome";

// Check which sort order the user wants
tineye.sortOrder = function (sort_order) {
  var query_string = "";
  switch (sort_order) {
    case "best_match":
      query_string = "&sort=score&order=desc";
      break;
    case "most_changed":
      query_string = "&sort=score&order=asc";
      break;
    case "biggest_image":
      query_string = "&sort=size&order=desc";
      break;
    case "newest":
      query_string = "&sort=crawl_date&order=desc";
      break;
    case "oldest":
      query_string = "&sort=crawl_date&order=asc";
      break;
    default:
      query_string = "";
  }
  return query_string;
};

// Check where the user want to open the search result
tineye.openUrl = function (tab_visibility, url) {
  apiNamespace.tabs.query(
    { currentWindow: true, active: true },
    function (tabs) {
      // Get new tab index and open new tabs next to current one
      var new_tab_index = tabs[0].index + 1;
      // Add openerTabId to provide better interop with other extensions
      var openerTabId = tabs[0].id;
      // Check where the user wants the url to be open
      switch (tab_visibility) {
        case "background":
          apiNamespace.tabs.create({
            url: url,
            active: false,
            index: new_tab_index,
            openerTabId,
          });
          break;
        case "foreground":
          apiNamespace.tabs.create({
            url: url,
            active: true,
            index: new_tab_index,
            openerTabId,
          });
          break;
        case "current":
          apiNamespace.tabs.update(tabs[0].id, { url: url });
          break;
        default:
          apiNamespace.tabs.create({
            url: url,
            active: false,
            index: new_tab_index,
            openerTabId,
          });
      }
    }
  );
};

// Send the selected image to TinEye
tineye.imageSearch = function (info, tab) {
  apiNamespace.storage.local.get(
    ["sort_order", "tab_visibility"],
    function (result) {
      var sort_order_query_string = tineye.sortOrder(result.sort_order);
      var url = encodeURIComponent(info.srcUrl);

      // Check the size of the url, if it is larger than ~30kb (actually 32 however we use 30 here for a bit of safety)
      // there will be issues with CloudFlare and other proxies, so we display an error page instead instructing the
      // user to post the image
      var request_url =
        url.length < 30720
          ? "https://" +
            tineye.SERVER +
            "/search/?pluginver=" +
            tineye.BROWSER +
            "-" +
            tineye.VERSION +
            sort_order_query_string +
            "&url=" +
            url
          : "https://" + tineye.SERVER + "/data_url_error";

      tineye.openUrl(result.tab_visibility, request_url);
    }
  );
};

// Create two context menu items for image, and page clicks
apiNamespace.contextMenus.create({
  title: "Search Image on TinEye",
  contexts: ["image"],
  onclick: tineye.imageSearch,
});
