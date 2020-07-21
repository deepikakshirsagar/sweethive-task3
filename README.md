# sweethive-task3

Directly can run just by clicking on index.html.

My Observations:
1. Layout can be impoved by using masonry layout to display images but as it is mentioned not use jquery so kept the layout simple.
2. using HTTPRequest getting CORS issue as flickr api does not authorize requst from unknown source.
3. Using jquery's getJSON(), it internally handles the CORS so we didn't get any issue,
4. I have used fetch to call flickr AP, as fecth never gives the CORS issue.