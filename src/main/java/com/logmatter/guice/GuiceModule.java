package com.logmatter.guice;


import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import com.logmatter.services.UserService;
import com.mongodb.MongoClient;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

import java.io.InputStream;
import java.util.Properties;

public class GuiceModule extends AbstractModule {
    private String mongoDB;

    public void configure() {
    }

    @Provides
    Datastore getDatasource(MongoClient mongoClient){
        Datastore ds = new Morphia().createDatastore(mongoClient,mongoDB);
        return ds;
    }

    @Singleton
    @Provides
    MongoClient getMongoClient(){
        Properties pro = new Properties();
        InputStream inputStream;

        try{

            inputStream = this.getClass().getClassLoader().getResourceAsStream("/mongo.properties");
            inputStream.read();
            pro.load(inputStream);
            MongoClient mongoClient=new MongoClient(pro.getProperty("host"));
            mongoDB = pro.getProperty("database");
            return mongoClient;


        }catch (Exception e){
            e.printStackTrace();
        }

        return null;
    }

}