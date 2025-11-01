#![cfg(test)]

use super::*;
use soroban_sdk::{Env};

#[test]
fn test_initialize() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let value = client.initialize(&10);
    assert_eq!(value, 10);
    
    let current = client.get_value();
    assert_eq!(current, 10);
}

#[test]
fn test_increment() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    client.initialize(&0);
    
    let value = client.increment();
    assert_eq!(value, 1);
    
    let value = client.increment();
    assert_eq!(value, 2);
}

#[test]
fn test_decrement() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    client.initialize(&10);
    
    let value = client.decrement();
    assert_eq!(value, 9);
    
    let value = client.decrement();
    assert_eq!(value, 8);
}

#[test]
fn test_add() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    client.initialize(&5);
    
    let value = client.add(&10);
    assert_eq!(value, 15);
    
    let value = client.add(&-5);
    assert_eq!(value, 10);
}

#[test]
fn test_subtract() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    client.initialize(&20);
    
    let value = client.subtract(&5);
    assert_eq!(value, 15);
    
    let value = client.subtract(&3);
    assert_eq!(value, 12);
}

#[test]
fn test_reset() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    client.initialize(&100);
    client.add(&50);
    
    let value = client.reset();
    assert_eq!(value, 0);
    
    let current = client.get_value();
    assert_eq!(current, 0);
}

#[test]
fn test_default_value() {
    let env = Env::default();
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    // Test that get_value returns 0 if never initialized
    let current = client.get_value();
    assert_eq!(current, 0);
}
