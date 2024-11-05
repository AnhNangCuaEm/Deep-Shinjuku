<?php

class Story
{
    public int $id;
    public string $title;
    public string $location;
    public string $locationId;
    public string $content;
    public string $comment;

    public function __construct(int $id, string $title, string $location, string $locationId, string $content, string $comment)
    {
        $this->id = $id;
        $this->title = $title;
        $this->location = $location;
        $this->locationId = $locationId;
        $this->content = $content;
        $this->comment = $comment;
    }
}
