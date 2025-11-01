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

    /// Multiply the counter by a value
    pub fn multiply(env: Env, value: i64) -> i64 {
        let current = Self::get_value(env.clone());
        let new_value = current.saturating_mul(value);
        env.storage().instance().set(&COUNTER_KEY, &new_value);
        new_value
    }

    /// Divide the counter by a value
    pub fn divide(env: Env, value: i64) -> i64 {
        if value == 0 {
            panic!("Division by zero");
        }
        let current = Self::get_value(env.clone());
        let new_value = current / value;
        env.storage().instance().set(&COUNTER_KEY, &new_value);
        new_value
    }

    /// Raise the counter to the power of a value
    pub fn power(env: Env, exponent: i64) -> i64 {
        let current = Self::get_value(env.clone());
        
        // Handle edge cases
        if exponent < 0 {
            panic!("Negative exponent not supported for integer power");
        }
        if exponent == 0 {
            let new_value = 1;
            env.storage().instance().set(&COUNTER_KEY, &new_value);
            return new_value;
        }
        if current == 0 {
            return 0;
        }
        
        // Calculate power using repeated multiplication
        let mut result = current;
        let mut exp = exponent - 1;
        while exp > 0 {
            result = result.saturating_mul(current);
            exp -= 1;
        }
        
        env.storage().instance().set(&COUNTER_KEY, &result);
        result
    }

    /// Get the absolute value
    pub fn abs(env: Env) -> i64 {
        let current = Self::get_value(env.clone());
        let new_value = current.abs();
        env.storage().instance().set(&COUNTER_KEY, &new_value);
        new_value
    }

    /// Get the modulo (remainder) of counter divided by a value
    pub fn modulo(env: Env, value: i64) -> i64 {
        if value == 0 {
            panic!("Modulo by zero");
        }
        let current = Self::get_value(env.clone());
        let new_value = current % value;
        env.storage().instance().set(&COUNTER_KEY, &new_value);
        new_value
    }
}

mod test;
