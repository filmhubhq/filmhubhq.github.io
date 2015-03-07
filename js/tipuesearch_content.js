---
---
var tipuesearch = {"pages": [
{% for post in site.posts %}
  {
    "title": "{{post.title}}",
    "text": "{{post.excerpt | strip_html | strip_newlines | replace: '\"','\\\"'}}",
    "tags": "{{post.tags | join: ' '}}",
    "loc": "{{post.url}}"
  }{% if forloop.last == false %},{% endif %}
{% endfor %}]};
