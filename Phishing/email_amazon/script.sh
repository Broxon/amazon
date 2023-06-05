#!/bin/bash

SUBJECT="Action needed: Sign-in 2KBB_03"
TO="jan.vacek@ssps.cz"
FROM="Amazon.com <cs-reply@deutsche-amazon.com>"
MIMEVersion="1.0"
ContentType="text/html"
HTMLFile="index.html"

(
echo "From: $FROM"
echo "To: $TO"
echo "MIME-Version: $MIMEVersion"
echo "Subject: $SUBJECT"
echo "Content-Type: $ContentType"
echo
cat $HTMLFile
) | sendmail -t

