"""
Application-specific exceptions raised by the grades framework.
"""


class GradesException(Exception):
    """
    Base class for all Grade framework exceptions.
    """
    pass


class GradingPolicyChangedException(GradesException):
    """
    Exception when grading policy changed since
    grade was computed.
    """
    pass
