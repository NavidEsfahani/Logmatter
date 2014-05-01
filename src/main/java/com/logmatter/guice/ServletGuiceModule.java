package com.logmatter.guice;

import com.Servlet;
import com.google.inject.servlet.ServletModule;

import java.util.HashMap;
import java.util.Map;

public class ServletGuiceModule extends ServletModule {
    @Override
    protected void configureServlets() {
       // filter("/*").through();
        serve("/Servlet").with(Servlet.class);


    }
}