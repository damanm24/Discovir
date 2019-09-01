/* eslint-disable no-console */
import { v1 as neo4j } from 'neo4j-driver';
import { uri, user, password } from '../const/database.credentials';

let driver;

export const connect = () => {
  driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

  driver.onCompleted = () => {
    console.log('Connection established');
  };

  driver.onError = error => {
    console.log(error);
  };
};

export const getSession = () => {
  return driver.session();
};

export const disconnect = () => {
  driver.close();
};
