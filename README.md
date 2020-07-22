# Spotify Toolz
Utilities to provide additional Spotify functionality.  Current tools include:

1. A _true_ playlist-shuffle feature.  Spotify's existing "shuffle" doesn't use true randomness.  In fact, there are _many_ complaints about the aberrant results that can come from using their "shuffle" feature.  This tool will take all the tracks in a given playlist, thoroughly randomize them, and then save them back into the playlist.  Once the randomization is complete, go to your Spotify player, disable the native "shuffle" feature, ensure that your playlist isn't sorted by Title, Artist, Album, Added On, or Duration, and then simply play the tracks in "order", starting from the first track and allowing it to play through.  You can re-randomize a playlist as many times as you like.<br/>

1. Find duplicates.  This will identify any "exact" duplicates (i.e., when the _exact same song_ has been included in a playlist two-or-more times).  But it will also look for "probable" duplicates - those instances where multiple songs in a playlist share a common name and artist and have a near-identical length.
