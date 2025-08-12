# 1.2.38

Sanskrit: देवब्रह्मणोरनुदात्तः

## Translation
In those hymns, the words deva and brāhmaṇa take the anudātta accent.

## Purpose
Lexical override after domain transformation (1.2.37).

## Behavior
- Forces all vowels in deva / brāhmaṇa to anudātta within subrahmaṇyā context.
- Coexists with svarita→udātta replacement but supersedes it on target lexemes.

## Example
| Input | Context | Modes Include |
|-------|---------|---------------|
| deva | {subrahmanya:true} | lexical-anudatta |

## Tests
See index.test.js.
