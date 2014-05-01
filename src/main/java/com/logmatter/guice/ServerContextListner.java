package com.logmatter.guice;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;

public class ServerContextListner extends GuiceServletContextListener {
    public static Injector injector = Guice.createInjector(
            new GuiceModule(),
            new ServletGuiceModule());

    @Override
    protected Injector getInjector() {
        return injector;
    }
}