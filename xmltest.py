#!/usr/bin/env python
import cgi,cgitb
cgitb.enable() # for errors

print ("Content-type: text/html;charset=utf-8")
print ()


############## extracting data from redddit :

from bs4 import BeautifulSoup
try: # for python3
	import urllib.request as urlreq
except ImportError: # else back to python2's urllib2
	import urllib2 as urlreq
 

site = "https://www.reddit.com/r/soccer"

hdr = { 'User-Agent' : 'just testing thx' }
req = urlreq.Request(site, headers=hdr)
page = urlreq.urlopen(req)

soup = BeautifulSoup(page)

#all the titles
p= soup.findAll('p', class_="title")





############## saving top 5 in /r/soccer data in an XML file


import xml.etree.cElementTree as ET
posts = ET.Element("posts")
i=0
while i<5 :
	temp= p[i].find('a').get('href')
	thread_title= p[i].find('a').string

		
	post=ET.SubElement(posts, "post");
	ET.SubElement(post, "title").text = thread_title
		
	if temp[i]=='/': # if the link is a post on self.soccer add reddit link
		#print ("https://www.reddit.com"+p0)
		ET.SubElement(post, "link").text = "https://www.reddit.com"+temp
	else:
		ET.SubElement(post, "link").text = temp
	i=i+1
			

tree = ET.ElementTree(posts)

tree.write("posts.xml")
#if permissions get fucked chown khalid:www-data /var/www/html/posts.xml






	#posts = ET.Element("posts")
	#post=ET.SubElement(posts, "post");
	#ET.SubElement(post, "title").text = "this is value1"
	#ET.SubElement(post, "link").text = "this is value2"





print("""
<html> 
	 <head> 
	   <meta http-equiv="refresh" content="0;url=website/index.html" /> 
	   <title>You are going to be redirected</title> 
	 </head> 
	  <body> 
	   Redirecting...
	 </body> 
</html>
""")



