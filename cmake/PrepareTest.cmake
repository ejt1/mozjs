function(mozilla_prepare_tests TEST_LIBRARY)
  cmake_parse_arguments(mozilla_prepare_tests "" "" "" ${ARGN})
  set(_test_srcs "${mozilla_prepare_tests_UNPARSED_ARGUMENTS}")
  if(NOT _test_srcs)
    message(SEND_ERROR "Error: mozilla_prepare_tests() called without any source files")
    return()
  endif()

  foreach(_file ${_test_srcs})
    add_executable(${_file} ${_file}.cpp)
    target_link_libraries(${_file} PRIVATE ${TEST_LIBRARY})
    add_test(NAME ${_file} COMMAND ${_file})
  endforeach()
endfunction()
