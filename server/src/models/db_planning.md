
## Collections

 - Users collection
  + _id
  + friends: [...User._id]
  + Garden._id
  + blogposts: [...BlogPost._id] <!--stretch goal 1-->
  + tips: [...Tip._id] <!--stretch goal 2-->

 - Gardens collection
  + _id
  + User._id
  + plants: [...Plant._id ]

 - Plants Collection
  + _id
  + plantApiId
  + plantName
  + plantImgUrl

<!-- stretch goal 1 -->
 - BlogPosts Collection
  + _id
  + User._id
  + text

<!-- stretch goal 2 -->
 - Tips collection
  + _id
  + plantApiId
  + tipText
  + User._id

