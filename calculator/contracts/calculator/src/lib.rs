#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, Env, Symbol};

// Storage key for the counter value
const COUNTER_KEY: Symbol = symbol_short!("CNT");

#[contract]
pub struct Contract;

#[contractimpl]
impl Contract {
    /// Initialize the calculator with a starting value
    pub fn initialize(env: Env, init_value: i64) -> i64 {
        env.storage().instance().set(&COUNTER_KEY, &init_value);
        init_value
    }

    /// Increment the counter by 1
    pub fn increment(env: Env) -> i64 {
        let current = Self::get_value(env.clone());
        let new_value = current + 1;
        env.storage().instance().set(&COUNTER_KEY, &new_value);
        new_value
    }

    /// Decrement the counter by 1
    pub fn decrement(env: Env) -> i64 {
        let current = Self::get_value(env.clone());
        let new_value = current - 1;
        env.storage().instance().set(&COUNTER_KEY, &new_value);
        new_value
    }

    /// Add a value to the counter
    pub fn add(env: Env, value: i64) -> i64 {
        let current = Self::get_value(env.clone());
        let new_value = current + value;
        env.storage().instance().set(&COUNTER_KEY, &new_value);
        new_value
    }

    /// Subtract a value from the counter
    pub fn subtract(env: Env, value: i64) -> i64 {
        let current = Self::get_value(env.clone());
        let new_value = current - value;
        env.storage().instance().set(&COUNTER_KEY, &new_value);
        new_value
    }

    /// Get the current value
    pub fn get_value(env: Env) -> i64 {
        env.storage()
            .instance()
            .get(&COUNTER_KEY)
            .unwrap_or(0)
    }

    /// Reset the counter to 0
    pub fn reset(env: Env) -> i64 {
        env.storage().instance().set(&COUNTER_KEY, &0i64);
        0
    }
}

mod test;
