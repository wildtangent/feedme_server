// Enable pusher logging - don't include this in production
Pusher.log = function(message) {
  if (window.console && window.console.log) window.console.log(message);
};

// Flash fallback logging - don't include this in production
WEB_SOCKET_DEBUG = true;

$(function(){
  // Options 
  var key = 'ea07c05121b1307db556';
  var topic = "default";
  var eventName = "alert";
  
  var listElement = $("ul#notifications");
  var listLinks = $("ul#notifications li a");
  var pageElement = $("#current_page iframe");


  // Configure Pusher
  var pusher = new Pusher(key);
  var channel = pusher.subscribe(topic);

  // Bind Pusher event callback
  channel.bind(eventName, function(data) {
    var tag = $("<li>");
    var link = $("<a>");
    link.attr("href", data.url);
    link.html(data.title);
    tag.html(link);
    listElement.append(tag);
    
    pageElement.attr("src", data.url);
  });
  
  // Configure sidebar link click behaviour
  listLinks.live("click", function(e){
    e.preventDefault();
    pageElement.attr("src", $(this).attr("href"));
  })  
  
});