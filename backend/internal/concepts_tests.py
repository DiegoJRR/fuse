
import pytest
from concepts import get_concepts_key

def test_combine_concepts():
    test_cases = {
        # Input strings: (first_concept, second_concept): expected_output
        ("Hello@World!", "Python$Programming"): "helloworld_pythonprogramming",
        ("Programming$Python", "hello@world!"): "helloworld_programmingpython",
        ("!!Special!!", "Characters###"): "characters_special",
        ("UpperCaseString", "lowercasestring"): "lowercasestring_uppercasestring",
        ("", ""): "",
        ("hello", ""): "",
        ("", "world"): "",
        ("hello", "world"): "hello_world",
        ("SameConcept", "sameconcept"): "sameconcept_sameconcept",
        ("!!!", "###"): "",
        ("123abc", "456xyz"): "123abc_456xyz",
        ("A", "b"): "a_b",
          # New test cases with multi-word concepts
        ("Hello World", "Python Programming"): "helloworld_pythonprogramming",
        ("Data Science", "Machine Learning"): "datascience_machinelearning",
        ("   Leading Spaces", "Trailing Spaces   "): "leadingspaces_trailingspaces",
        ("Multiple   Spaces", "Between Words"): "betweenwords_multiplespaces",
        ("Words with $pecial #characters!", "Another*Concept"): "anotherconcept_wordswithpecialcharacters",
        ("One", "Two Three Four"): "one_twothreefour",
    }

    for (first_concept, second_concept), expected in test_cases.items():
        assert get_concepts_key(first_concept, second_concept) == expected