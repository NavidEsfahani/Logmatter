package com.logmatter.business;


import com.logmatter.bean.models.User;
import org.mongodb.morphia.Datastore;

import javax.inject.Inject;

public class UserLogic {

    @Inject Datastore ds;

    public boolean isUsernameValid(String username){
        long l2 = ds.createQuery(User.class).field("name").equal("navid").countAll();
        int result = ds.createQuery(User.class).field("name").equal("navid").getBatchSize();

        return (result>0);
    }

}
