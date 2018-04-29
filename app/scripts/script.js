ts.ui.ready(function() {
	$('#submit').on('click tap', function(e){
		e.preventDefault();
		loading();
		assessInputs();
	});
	// function for assessing the inputs and determining feedback
	var assessInputs = function(){
		// get length values from inputs
		var a = parseInt($('#side-a').val()),
			b = parseInt($('#side-b').val()),
			c = parseInt($('#side-c').val());

		// check if all 3 lengths are specified
		var allInputsAreFilled = true;
		$('input').each(function(index, input){
			$(this).parent().removeClass('ts-error');
			var inputLength = $(input).val();
			if (inputLength == ''){
				$(this).parent().addClass('ts-error');
				allInputsAreFilled = false;
			}
		});

		// if none of the length inputs are empty
		if (allInputsAreFilled){
			// check that the values provided can are valid, according to the Triangle Inequality Theorem
			if ((a + b) > c && (a + c) > b && (b + c) > a){
				// determine the type of triangle by comparing side lengths
				if (a != b && a != c && b != c){
					feedbackBox(true, 'Scalene');
				}
				else if ((a == b && a != c) || (a == c && a != b) || (b == c && b != a)){
					feedbackBox(true, 'Isosceles');
				}
				else if (a == b && b == c){
					feedbackBox(true, 'Equilateral');
				}
			}
			// error out if the triangle cannot exist, because one of the sides is too long or short to complete it
			else {
				feedbackBox(false, 'This triangle cannot exist, according to the Triangle Inequality Theorem');
			}
		}
		// show a warning if the lengths haven't been provided
		else {
			ts.ui.Notification.warning('Please provide valid side lengths');
		}
		return false;
	};
	// function that provides feedback on submit, depending on the outcome
	var feedbackBox = function(result, message){
		if (result){
			ts.ui.Notification.success('This triangle can exist and would be **'+message+'**');
		}
		else {
			ts.ui.Notification.error(message);
		}
	};
	// function for showing that something is happening, when the user has pressed the button
	// (same as here: http://ui.tradeshift.com/v10/#components/buttons/index.html#mybutton)
	var loading = function(){
		var submit = $('#submit');
		submit.attr('data-ts.busy', 'true');
		setTimeout(function(){
			submit.attr('data-ts.busy', 'false');
		}, 1000);
	};
});