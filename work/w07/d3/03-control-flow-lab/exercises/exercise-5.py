# exercise-05 Fibonacci sequence for first 50 terms

# Write the code that:
# 1. Calculates and prints the first 50 terms of the fibonacci sequence.
# 2. Print each term and number as follows:
#      term: 0 / number: 0
#      term: 1 / number: 1
#      term: 2 / number: 1
#      term: 3 / number: 2
#      term: 4 / number: 3
#      term: 5 / number: 5
#      etc.

# Hint: The next number is found by adding the two numbers before it

nums = int(input("How many terms? "))

num_one, num_two = 0, 1
num_count = 0

if nums <= 0:
   print("Please enter a positive integer")
elif nums == 1:
   print("Fibonacci sequence upto",nums,":")
   print(num_one)
else:
   print("Fibonacci sequence:")
   while num_count < nums:
       print(num_one)
       value = num_one + num_two
       num_one = num_two
       num_two = value
       num_count += 1