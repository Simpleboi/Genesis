
# To Handle Whitespace
ws -> " " | "\t" | "\n" | "\r"

# Digits: A single digit from 0 - 9
digit -> "0" 
       | "1"
       | "2"
       | "3"
       | "4"
       | "5"
       | "6"
       | "7"
       | "8"
       | "9"

# A number is one or more digits
number -> digit+ 

# An Expression rule that handles
expression -> digit "+" digit  -> add_expr
           | number "-" number  -> sub_expr
           | number 

term -> number 
      | "(" expression ")"


