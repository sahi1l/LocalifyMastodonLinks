This Firefox addon converts links to account profiles on Mastodon servers so
that they point to the corresponding page on your home server: e.g. it
rewrites `https://server.mastodon/@user` to
`https://homeserver.mastodon/@user@server`.  
This will make it easier to follow people, like their posts, etc.  It can
color those converted links if you like, and also color links to those
accounts on your home server.

The addon is unsigned as of present; to install it, you need to visit
`about:debugging#/runtime/this-firefox` and use "Load Temporary
Add-on...".

## BUGS AND ISSUES:
- The extension only works for servers where the profile links are of
the form `server.mastodon/@user`; I've seen some that prefer
`server.mastodon/users/user` and I haven't handled those yet.
- On some servers you may need to right-click and choose "Open in New
Tab"; they seem to be capturing the normal link and doing something
Javascripty.

## GOALS:
- I want to add a toolbar button to make it easier to turn on and
off.  If I want "turn off" to remove the changes, I will need to add a
field to each link like `data-original-link` and maybe even
`data-original-color`.
- It would also be good to add a right-click menu item which gives you
the option to "visit link on `homeserver.mastodon`", even when the
automatic link-changing is off.


## NAMING:
I'm still looking for a good name.  Currently it is called "Localify"
which is pretty terrible.  As a DS9 fan I thought maybe "Move Along
Home"?  But I can't think of a good name that describes the function
and works "Mastodon" in there.

