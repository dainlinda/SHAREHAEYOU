create table if not exists user(
    id int not null AUTO_INCREMENT,
    fullname varchar(32) not null,
    email varchar(64) not null,
    password varchar(128) not null,
  
    primary key(id),
    unique(email)
);

-- 자기정보 userInfo 1:1
create table if not exists userInfo(
    id int not null AUTO_INCREMENT,
    image_path VARCHAR (255) NOT NULL,
    introduction text,
    user_id int not null,
 
    primary key (id),
    foreign key (user_id) references user(id)
);

-- 학력 education 1:n
create table if not exists education(
    id int not null AUTO_INCREMENT,
    college varchar(64) not null,
    major varchar(64) not null,
    degree tinyint not null,
    user_id int not null,

    primary key (id),
    foreign key (user_id) references user(id)
);

-- 수상이력 awards 1:n
create table if not exists awards(
    id int not null AUTO_INCREMENT,
    award varchar(64) not null,
    detail text,
    user_id int not null,

    primary key (id),
    foreign key (user_id) references user(id)
);

-- 프로젝트 projects 1:n
create table if not exists projects(
    id int not null AUTO_INCREMENT,
    project varchar(64) not null,
    detail text,
    start_date date,
    end_date date,
    user_id int not null,

    primary key (id),
    foreign key (user_id) references user(id)
);
-- 자격증 certificates 1:n
create table if not exists certificates(
    id int not null AUTO_INCREMENT,
    certificate varchar(64) not null,
    detail text,
    get_date date,
    user_id int not null,
  
    primary key (id),
    foreign key (user_id) references user(id)
);

-- INSERT INTO boardArticle (title, content, board_id) VALUES ('제목1', '내용1', 1);