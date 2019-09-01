
abc = [1,3,5,9];

function print_array(an_array) {
    for (let i = 0; i < abc.length; i++) {
        console.log(an_array[i]);
    }
    return 'Bye';
}

print_array(abc);

function my_print_function(x) {
    console.log(x);
}

function process_array(an_array, a_function) {
    for (let i = 0; i < abc.length; i++) {
        a_function(an_array[i]);
    }
    return 'Goodbye';
}

process_array(abc, my_print_function);