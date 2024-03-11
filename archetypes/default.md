+++
author = "哈桑"
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
description = "{{ .File.ContentBaseName }}"
date = {{ .Date }}
tags = ["{{ replace .File.ContentBaseName "-" " " | title }}", "privacy"]
thumbnail = "/blog_images/" 
+++