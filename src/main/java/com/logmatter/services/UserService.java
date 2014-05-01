package com.logmatter.services;

import com.google.inject.Singleton;
import com.logmatter.business.UserLogic;
import com.logmatter.guice.GuiceModule;
import com.logmatter.guice.ServerContextListner;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.BooleanNode;
import org.codehaus.jackson.node.ObjectNode;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;


@Path("userService")
public class UserService
{

    UserLogic userLogic;

    public UserService (){
        userLogic = ServerContextListner.injector.getInstance(UserLogic.class);
    }

    @Path("/usernameIsAvailable")
    @GET
    @Produces("application/json")
    public String usernameIsAvailable() throws Exception {

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode jsonObject = mapper.createObjectNode();

        userLogic.isUsernameValid("navid");

        BooleanNode booleanNode = jsonObject.booleanNode(true);
        jsonObject.put("isValid",booleanNode);

       return mapper.writeValueAsString(jsonObject);
    }
}