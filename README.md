# INTRODUCTION
slock-button is gnome-shell extension, made for the sole reason of temporarily restoring the lock that used to be on your topbar.

# INSTALLATION
1. Clone the extension to your gnome-shell extensions list.
```bash
$> mkdir -p $HOME/.local/share/gnome-shell/extensions
$> cd $HOME/.local/share/gnome-shell/extensions
$> git clone 'https://github.com/Creativty/slock-button.git' 'slock@aindjare.1337.student.ma'
```
**NOTE**: Make sure the folder/directory names are properly quoted (I recommend single quotes).

2. Restart your gnome session via pressing ALT+F2 and running the `restart` command.
_This looks scary but don't worry it just restarts your gnome-session_
3. Enable the extension
```bash
$> gnome-extensions enable 'slock@aindjare.1337.student.ma'
```
4. Enjoy, a little key icon should pop right on your topbar, use that to lock your sessions, no more terminal commands when you just want to lock quickly.

# FAQ
**Question**: Extension “slock\@aindjare.1337.student.ma” does not exist

**Answers**: Make sure the extension folder name matches the `uuid` in the `metadata.json` file
