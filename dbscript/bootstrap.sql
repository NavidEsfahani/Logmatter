--liquibase formatted sql
--changeset NavidEsfahani:create_tables (dbms:postgresql failOnError:true)

CREATE TABLE products (
  productId integer NOT NULL,
  name character varying(100) NOT NULL,
  price double precision NULL DEFAULT 0,
  PRIMARY KEY  (productId)
);


CREATE TABLE orders (
  orderId integer NOT NULL,
  date timestamp  NOT NULL,
  temp character varying (20),
  version integer NOT NULL DEFAULT 0,
  PRIMARY KEY  (orderId)
);
CREATE SEQUENCE orders_seq
  INCREMENT 1
  MINVALUE 1
  NO MAXVALUE
  START 1
  CACHE 1;

CREATE TRIGGER version_orders BEFORE UPDATE
ON orders FOR each ROW
EXECUTE PROCEDURE versionLocking();


CREATE TABLE orderItems (
  orderItemId integer NOT NULL,
  orderId integer NOT NULL,
  productId integer NOT NULL,
  PRIMARY KEY  (orderItemId)
);
CREATE SEQUENCE orderItems_seq
  INCREMENT 1
  MINVALUE 1
  NO MAXVALUE
  START 1
  CACHE 1;


--rollback drop table IF EXISTS products;
--rollback drop table IF EXISTS orders; drop SEQUENCE IF EXISTS orders_seq;
--rollback drop table IF EXISTS orderItems; drop SEQUENCE IF EXISTS orderItems_seq;

--changeset NavidEsfahani:load_sample_data (dbms:postgresql failOnError:true)
INSERT INTO products VALUES(1,'MacBook Air',1576.99);
INSERT INTO products VALUES(2,'IPhone 5s',750.99);
INSERT INTO products VALUES(3,'15"" MacBookPro',1789.99);
INSERT INTO products VALUES(4,'13"" MacBookPro Retina Display',1925.00);
INSERT INTO products VALUES(5,'15"" MacBookPro Retina Display',2546.00);
--rollback DELETE FROM products;
