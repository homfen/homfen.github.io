---
layout: post
title:  "Sublime Text Context Menu"
date:   2015-01-19 16:49:31
categories: Frontend
---
分享一下如何在Sublime中自定义右键菜单，以Git为例，我们知道Git有很多命令（Sync，Fetch，Show Log等），如果把这些命令加到右键菜单中，是否会方便一些呢？

打开Sublime，选择Tools->New Plugin...

<img class="postImage" src="http://homfen.appsp0t.com/serve/AMIfv95g64m5J-CydACiHPabZS6bG5lu5MQ0fxBvaD8LvlePeo_H-0tgTRZtngkHgkN9jy9OX8cuWXr5FTj14eV6piTDAO9jL5quBhZPWTUbpe-1A-kNF5VkGLeD7ogv9qhoQ0VBnKh8V-TExRteYZMg5IBTFf_P3w"/>

在打开的文件中输入以下代码，TortoiseGit的安装地址自行修改：

    import os ,subprocess, sublime_plugin
    class SyncCommand(sublime_plugin.TextCommand):
        def run(self, edit):
            file_name=self.view.file_name()
            path=file_name.split("\\")
            path.pop()
            current_directory="\\".join(path)
            command= "cd "+current_directory+" & E:\\program\\TortoiseGit\\bin\\TortoiseGitProc /Command:sync"
            proc = subprocess.Popen(command, shell=True)
            os.kill(proc.pid)

    class FetchCommand(sublime_plugin.TextCommand):
        def run(self, edit):
            file_name=self.view.file_name()
            path=file_name.split("\\")
            path.pop()
            current_directory="\\".join(path)
            command= "cd "+current_directory+" & E:\\program\\TortoiseGit\\bin\\TortoiseGitProc /Command:fetch"
            proc = subprocess.Popen(command, shell=True)
            os.kill(proc.pid)

    class ShowlogCommand(sublime_plugin.TextCommand):
        def run(self, edit):
            file_name=self.view.file_name()
            path=file_name.split("\\")
            path.pop()
            current_directory="\\".join(path)
            command= "cd "+current_directory+" & E:\\program\\TortoiseGit\\bin\\TortoiseGitProc /Command:log"
            proc = subprocess.Popen(command, shell=True)
            os.kill(proc.pid)
            
保存的时候，新建一个文件夹，并保存为.py格式。接下来，刚刚新建的文件夹中新建一个“Context.sublime-menu”的文件（注意后缀名），里面的内容比较简单，就是刚刚的那三个命令：

    [
         { "command": "sync" },
         { "command": "fetch" },
         { "command": "showlog" }
    ]

ok，重启Sublime，随便打开一个文件，右键，就有了

<img class="postImage" src="http://homfen.appsp0t.com/serve/AMIfv97837L-oph4Iw0uaMETPYu7nD6lI26cHi1Gn8jbk6sGmz6MSOiSWAssyzvTZ3Kk-9xflPKAmveB4_SHdtqQODXcEkZD84DqvzIttM4BpsZ4KDHWQ6taC-p6Rb5gOP0ovwBlZ9yAZ0_RnKizeozlKsrVv_I7Aw"/>