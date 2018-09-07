use synclewords

DROP TABLE WordsList

CREATE TABLE WordsList(
    SN int auto_increment primary key,
    JPN varchar(24) NOT NULL,
    KOR varchar(24) NOT NULL,
    GroupSN INT NOT NULL
)

CREATE NONCLUSTERED INDEX IX_WordsList ON dbo.WordsList(JPN)

ALTER TABLE WordsList ADD INDEX IX_WordsList (JPN);


SHOW INDEX FROM WordsList;



insert into WordsList values ( 1, "合え", "테스트", 1 )
insert into WordsList values ( 0, "合え", "테스트", 1 )
insert into WordsList values ( , "合", "테스트2", "Test2" )
select * from wordslist
