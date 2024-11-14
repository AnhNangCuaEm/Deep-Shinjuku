<?php

$storyData = new StoryData();
$story = $storyData->getById($_GET['id']);
$maxId = $storyData->getMaxId();
$storyId = $_GET['id'] ?? null;
$comments = [];
$commentCount = 0;

if ($storyId !== null) {
   //今のストーリーのLike数を取得
   $likeManager = new LikeManager('./data/likes_data.json');
   $likeCount = $likeManager->getLikes($storyId);
   //今のユーザーがLikeしているかどうかを取得
   $hasAlreadyLiked = isset($_SESSION['liked_stories'][$storyId]) ? true : false;

   if (isset($_POST['hasLiked'])) {
      $hasLiked = $_POST['hasLiked'] === 'true';
      $newLikeCount = $likeManager->toggleLikeForStory($storyId, $hasLiked);
      echo $newLikeCount;
   }
}

$commentManager = new CommentManager('./data/likes_data.json');


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['id'])) {
   $storyId = $_GET['id'];
   $author = $_POST['author'];
   $content = $_POST['content'];
   $commentCount = $commentManager->getComments($storyId);

   //addCommentメソッドを使ってコメントを追加
   $newComment = $commentManager->addComment($storyId, $author, $content);

   if ($newComment) {
      echo json_encode($newComment);
   } else {
      echo json_encode(['error' => 'エラーが発生しました']);
   }
}
