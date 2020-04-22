# 42 Nomad

## 협업 도구

[트렐로](https://trello.com/b/DFfWnGrR/42-sns)
[슬랙](https://42sns.slack.com)
[ERDCLOUD](https://www.erdcloud.com/d/WXRo9qtvcmcTnsbsQ)

## Server stack

- node js (v12 stable)
- graphql
- typescript
- typescript orm

## Client stack

- react
- typescript

## TODO

### User

- [ ] log-in/log-out
- [ ] 42 authentication sign-in
- [ ] see user profile
- [ ] edit user profile

### Post

- [ ] see the feed
- [ ] search feed
- [ ] apply / unapply
- [ ] upload post
- [ ] edit post
- [ ] finish post
- [ ] delete post
- [ ] subscribe post

### Chatting

- [ ] see chatting room
- [ ] see chatting room list
- [ ] send message
- [ ] receive message

## Data model

### User

- id
- userName
- profile image url
- email
- createAt
- updateAt
- Posts (relation)
- Rooms (relation)
- Applys (relation)

### Post

- id
- location
- start
- end
- caption
- createAt
- updateAt
- isfinished
- Rooms (relation)
- User (relation)
- Applys (relation)
- Files (relation)

### File

- id
- url
- Post (relation)
- createAt
- updateAt

### Chatting room

- id
- createAt
- updateAt
- Users (relation)
- message (relation)

### Chatting message

- id
- text
- from (relation)
- to (relation)
- createAt
- updateAt

### Apply

- id
- user
- post
- createAt
- updateAt

with dakim yshim donglee
